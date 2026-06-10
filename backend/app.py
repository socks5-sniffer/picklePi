"""Flask entry point — initialises Firebase, registers routes, wires middleware.

Access control: every /api/progress route requires a verified Firebase ID
token (Authorization: Bearer <token>), and the userId in the URL must match
the uid inside that token. A user can therefore never read or write another
user's progress, regardless of what path they request.
"""

import json
import os
import uuid
from datetime import datetime, timezone
from functools import wraps

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import auth, credentials, firestore
from flask import Flask, abort, g, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.exceptions import HTTPException

from bouncer import ValidationError, sanitize_lab_entry, sanitize_progress, validate_id
from logger import log_exception, logger
from middleware import apply_security_headers

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(BACKEND_DIR)

load_dotenv(os.path.join(BACKEND_DIR, ".env"))

# ── Firebase ────────────────────────────────────────────────────────────────
_cred_path = os.environ.get(
    "FIREBASE_CREDENTIALS", os.path.join(BACKEND_DIR, "firebase-secret.json")
)
if not os.path.exists(_cred_path):
    raise SystemExit(
        f"Firebase credentials not found at {_cred_path}. "
        "Set FIREBASE_CREDENTIALS in backend/.env or place firebase-secret.json "
        "in backend/ (see backend/README.md)."
    )
firebase_admin.initialize_app(credentials.Certificate(_cred_path))
db = firestore.client()

# ── Flask ───────────────────────────────────────────────────────────────────
app = Flask(__name__)
apply_security_headers(app)

_origins = [
    o.strip()
    for o in os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",")
    if o.strip()
]
CORS(
    app,
    origins=_origins,
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
)

# ── Rate limiting ───────────────────────────────────────────────────────────
# In-memory storage is fine for a single-process deployment; point
# RATELIMIT_STORAGE_URI at Redis/Memcached if this ever runs multi-worker.
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["120 per minute"],
    storage_uri=os.environ.get("RATELIMIT_STORAGE_URI", "memory://"),
)


# ── CSRF guard ──────────────────────────────────────────────────────────────
@app.before_request
def require_xhr_header():
    """State-changing requests must carry X-Requested-With.

    The custom header forces a CORS preflight, so cross-origin pages cannot
    fire these requests via simple forms/fetches. The frontend sets it on
    every call (src/lib/api.ts).
    """
    if request.method in ("POST", "PUT", "DELETE", "PATCH"):
        if request.headers.get("X-Requested-With") != "XMLHttpRequest":
            abort(403, description="missing X-Requested-With header")


# ── Authentication ──────────────────────────────────────────────────────────
def require_auth(fn):
    """Verify the Firebase ID token and stash the caller's uid on g."""

    @wraps(fn)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            abort(401, description="missing bearer token")
        try:
            # check_revoked rejects tokens for signed-out-everywhere or
            # disabled accounts instead of honouring them until expiry.
            decoded = auth.verify_id_token(
                header.removeprefix("Bearer "), check_revoked=True
            )
        except (auth.RevokedIdTokenError, auth.UserDisabledError):
            abort(401, description="token revoked or account disabled")
        except Exception:
            log_exception("token verification failed")
            abort(401, description="invalid or expired token")
        g.uid = decoded["uid"]
        return fn(*args, **kwargs)

    return wrapper


def require_same_user(user_id: str) -> None:
    """IDOR guard: the URL's userId must be the authenticated caller."""
    if user_id != g.uid:
        logger.warning("uid %s attempted access to userId %s", g.uid, user_id)
        abort(403, description="forbidden")


# ── Routes ──────────────────────────────────────────────────────────────────
@app.get("/api/status")
def status():
    return jsonify({"status": "online", "secure": True})


@app.post("/api/verify-token")
@limiter.limit("20 per minute")
@require_auth
def verify_token():
    return jsonify({"uid": g.uid})


@app.get("/api/progress/<user_id>")
@require_auth
def get_progress(user_id):
    validate_id(user_id, "userId")
    require_same_user(user_id)
    doc = db.collection("progress").document(g.uid).get()
    if not doc.exists:
        abort(404, description="no progress found")
    return jsonify(doc.to_dict())


@app.put("/api/progress/<user_id>")
@require_auth
def put_progress(user_id):
    validate_id(user_id, "userId")
    require_same_user(user_id)
    progress = sanitize_progress(request.get_json(silent=True))
    db.collection("progress").document(g.uid).set(progress)
    return jsonify(progress)


@app.post("/api/progress/<user_id>/notebook")
@require_auth
def create_notebook_entry(user_id):
    validate_id(user_id, "userId")
    require_same_user(user_id)
    entry = sanitize_lab_entry(request.get_json(silent=True))
    entry["id"] = uuid.uuid4().hex
    entry["date"] = datetime.now(timezone.utc).isoformat()
    db.collection("progress").document(g.uid).set(
        {"labNotebook": firestore.ArrayUnion([entry])}, merge=True
    )
    return jsonify(entry), 201


@app.delete("/api/progress/<user_id>/notebook/<entry_id>")
@require_auth
def delete_notebook_entry(user_id, entry_id):
    validate_id(user_id, "userId")
    validate_id(entry_id, "entryId")
    require_same_user(user_id)
    ref = db.collection("progress").document(g.uid)
    doc = ref.get()
    if doc.exists:
        notebook = doc.to_dict().get("labNotebook", [])
        ref.update({"labNotebook": [e for e in notebook if e.get("id") != entry_id]})
    return "", 204


def _serve_json(filename):
    with open(os.path.join(REPO_ROOT, "data", filename), encoding="utf-8") as f:
        return jsonify(json.load(f))


@app.get("/api/curriculum")
def curriculum():
    return _serve_json("curriculum.json")


@app.get("/api/dictionary")
def dictionary():
    return _serve_json("dictionary.json")


# ── Error handling ──────────────────────────────────────────────────────────
@app.errorhandler(ValidationError)
def handle_validation_error(err):
    return jsonify({"error": str(err)}), 400


@app.errorhandler(HTTPException)
def handle_http_error(err):
    return jsonify({"error": err.description}), err.code


@app.errorhandler(Exception)
def handle_unexpected(err):
    # Let deliberate HTTP errors (405, 415, 429, …) keep their status code
    # instead of being masked as a 500.
    if isinstance(err, HTTPException):
        return handle_http_error(err)
    # Full trace goes to app.log; the client gets only an opaque error id.
    error_id = log_exception("unhandled exception")
    return jsonify({"error": "internal server error", "errorId": error_id}), 500


if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT", "3001"))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host="127.0.0.1", port=port, debug=debug)
