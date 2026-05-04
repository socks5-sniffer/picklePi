"""
picklePi Flask backend — entry point.

Initialises the Firebase Admin SDK, registers all API routes, and wires up
the CORS and security-header middleware.  Run with:

    python app.py

The server binds to the port defined by the ``FLASK_PORT`` environment
variable (default 3001) so it matches the ``/api`` proxy in ``vite.config.ts``.
"""

import json
import os
import uuid
from datetime import datetime

import firebase_admin
from firebase_admin import auth as firebase_auth
from firebase_admin import credentials, firestore
from flask import Flask, jsonify, request
from flask_cors import CORS

from bouncer import (
    MAX_TEXT_FIELD_LENGTH,
    sanitise_entry_id,
    sanitise_string,
    sanitise_user_id,
    sanitise_username,
)
from logger import log_error, log_info, log_warning
from middleware import apply_security_headers

# ── Firebase Admin SDK ─────────────────────────────────────────────────────

_cred_path = os.getenv('FIREBASE_CREDENTIALS', 'firebase-secret.json')

if os.path.exists(_cred_path):
    _cred = credentials.Certificate(_cred_path)
    firebase_admin.initialize_app(_cred)
    _db = firestore.client()
    log_info('Firebase Admin SDK initialised.')
else:
    # Running without credentials (e.g. in CI / unit tests).
    log_warning(
        f'Firebase credentials not found at "{_cred_path}". '
        'Authenticated endpoints will return 503.'
    )
    _db = None

# ── Flask application ──────────────────────────────────────────────────────

app = Flask(__name__)

_allowed_origins = [
    o.strip()
    for o in os.getenv('CORS_ORIGINS', 'http://localhost:5173,https://localhost:5173').split(',')
    if o.strip()
]
CORS(app, origins=_allowed_origins, supports_credentials=True)
apply_security_headers(app)


# ── Helpers ────────────────────────────────────────────────────────────────

def _firebase_ready():
    """Return True when the Firestore client is available."""
    return _db is not None


def _verify_token(token: str | None) -> str | None:
    """
    Validate a Firebase ID token and return the corresponding uid, or None.

    Does NOT raise — callers check the return value.
    """
    if not token or not _firebase_ready():
        return None
    try:
        decoded = firebase_auth.verify_id_token(token)
        return decoded['uid']
    except Exception as exc:
        log_warning(f'Token verification failed: {exc}')
        return None


def _require_firebase(func):
    """Decorator that returns 503 when Firebase is not configured."""
    from functools import wraps

    @wraps(func)
    def wrapper(*args, **kwargs):
        if not _firebase_ready():
            return jsonify({'error': 'Backend storage is not configured.'}), 503
        return func(*args, **kwargs)

    return wrapper


def _require_auth(func):
    """
    Decorator that validates the Bearer token in the Authorization header.

    The authenticated uid is passed as ``auth_uid`` keyword argument.
    """
    from functools import wraps

    @wraps(func)
    def wrapper(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header[len('Bearer '):]
        uid = _verify_token(token)
        if uid is None:
            return jsonify({'error': 'Unauthorized.'}), 401
        return func(*args, **kwargs, auth_uid=uid)

    return wrapper


# ── Routes ─────────────────────────────────────────────────────────────────


@app.get('/api/status')
def status():
    """Health check."""
    return jsonify({'status': 'online', 'secure': True})


@app.post('/api/login')
def login():
    """
    Accept a username, sanitise it, and return a Firebase custom token.

    The client should exchange this custom token for an ID token via the
    Firebase JS SDK (``signInWithCustomToken``).
    """
    if not _firebase_ready():
        return jsonify({'error': 'Backend storage is not configured.'}), 503

    data = request.get_json(silent=True) or {}
    try:
        username = sanitise_username(data.get('username', ''))
    except (TypeError, ValueError) as exc:
        return jsonify({'error': str(exc)}), 400

    try:
        # Use the username as the uid for simplicity; real deployments would
        # look up or create a user record in Firestore first.
        custom_token = firebase_auth.create_custom_token(username)
        return jsonify({'token': custom_token.decode('utf-8') if isinstance(custom_token, bytes) else custom_token})
    except Exception as exc:
        safe_msg = log_error(exc, 'login')
        return jsonify({'error': safe_msg}), 500


@app.post('/api/verify-token')
def verify_token():
    """Validate a Firebase ID token and return the decoded user identity."""
    if not _firebase_ready():
        return jsonify({'error': 'Backend storage is not configured.'}), 503

    data = request.get_json(silent=True) or {}
    token = data.get('token')
    if not token or not isinstance(token, str):
        return jsonify({'error': 'A "token" string is required.'}), 400

    try:
        decoded = firebase_auth.verify_id_token(sanitise_string(token, 2048))
        return jsonify({'uid': decoded['uid'], 'email': decoded.get('email')})
    except firebase_auth.InvalidIdTokenError:
        return jsonify({'error': 'Invalid or expired token.'}), 401
    except Exception as exc:
        safe_msg = log_error(exc, 'verify-token')
        return jsonify({'error': safe_msg}), 500


# ── Progress ───────────────────────────────────────────────────────────────


@app.get('/api/progress/<user_id>')
@_require_firebase
@_require_auth
def get_progress(user_id: str, auth_uid: str):
    """Fetch a user's full progress object from Firestore."""
    try:
        uid = sanitise_user_id(user_id)
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

    if uid != auth_uid:
        return jsonify({'error': 'Forbidden.'}), 403

    try:
        doc = _db.collection('progress').document(uid).get()
        if not doc.exists:
            return jsonify(None), 404
        return jsonify(doc.to_dict())
    except Exception as exc:
        safe_msg = log_error(exc, f'get_progress uid={uid}')
        return jsonify({'error': safe_msg}), 500


@app.put('/api/progress/<user_id>')
@_require_firebase
@_require_auth
def save_progress(user_id: str, auth_uid: str):
    """Persist a user's full progress object to Firestore."""
    try:
        uid = sanitise_user_id(user_id)
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

    if uid != auth_uid:
        return jsonify({'error': 'Forbidden.'}), 403

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({'error': 'Request body must be a JSON object.'}), 400

    # Sanitise free-text fields inside lab notebook entries
    notebook = data.get('labNotebook', [])
    if not isinstance(notebook, list):
        return jsonify({'error': '"labNotebook" must be an array.'}), 400

    sanitised_notebook = []
    text_fields = ('whatWorked', 'whatDidnt', 'whatChanged', 'oneThingLearned')
    for entry in notebook:
        if not isinstance(entry, dict):
            continue
        clean_entry: dict = {}
        for field in text_fields:
            try:
                clean_entry[field] = sanitise_string(entry.get(field, ''), MAX_TEXT_FIELD_LENGTH)
            except TypeError:
                clean_entry[field] = ''
        # Pass through safe metadata fields
        for meta in ('id', 'projectId', 'date'):
            clean_entry[meta] = sanitise_string(entry.get(meta, ''), 256) if entry.get(meta) else ''
        sanitised_notebook.append(clean_entry)

    payload = {
        'projectStatuses': data.get('projectStatuses', {}),
        'badges': [sanitise_string(b, 128) for b in data.get('badges', []) if isinstance(b, str)],
        'labNotebook': sanitised_notebook,
    }

    try:
        _db.collection('progress').document(uid).set(payload)
        return jsonify({'ok': True})
    except Exception as exc:
        safe_msg = log_error(exc, f'save_progress uid={uid}')
        return jsonify({'error': safe_msg}), 500


# ── Lab Notebook ───────────────────────────────────────────────────────────


@app.post('/api/progress/<user_id>/notebook')
@_require_firebase
@_require_auth
def create_notebook_entry(user_id: str, auth_uid: str):
    """Append a new lab-notebook entry to the user's progress document."""
    try:
        uid = sanitise_user_id(user_id)
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

    if uid != auth_uid:
        return jsonify({'error': 'Forbidden.'}), 403

    data = request.get_json(silent=True) or {}
    text_fields = ('whatWorked', 'whatDidnt', 'whatChanged', 'oneThingLearned')
    entry: dict = {
        'id': str(uuid.uuid4()),
        'date': datetime.utcnow().isoformat() + 'Z',
    }

    try:
        entry['projectId'] = sanitise_string(data.get('projectId', ''), 128)
        for field in text_fields:
            entry[field] = sanitise_string(data.get(field, ''), MAX_TEXT_FIELD_LENGTH)
    except (TypeError, ValueError) as exc:
        return jsonify({'error': str(exc)}), 400

    try:
        doc_ref = _db.collection('progress').document(uid)
        doc_ref.update({'labNotebook': firestore.ArrayUnion([entry])})
        return jsonify(entry), 201
    except Exception as exc:
        safe_msg = log_error(exc, f'create_notebook_entry uid={uid}')
        return jsonify({'error': safe_msg}), 500


@app.delete('/api/progress/<user_id>/notebook/<entry_id>')
@_require_firebase
@_require_auth
def delete_notebook_entry(user_id: str, entry_id: str, auth_uid: str):
    """Remove a single lab-notebook entry by ID."""
    try:
        uid = sanitise_user_id(user_id)
        eid = sanitise_entry_id(entry_id)
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

    if uid != auth_uid:
        return jsonify({'error': 'Forbidden.'}), 403

    try:
        doc_ref = _db.collection('progress').document(uid)
        doc = doc_ref.get()
        if not doc.exists:
            return jsonify({'error': 'Progress document not found.'}), 404

        notebook = doc.to_dict().get('labNotebook', [])
        updated = [e for e in notebook if e.get('id') != eid]
        doc_ref.update({'labNotebook': updated})
        return jsonify({'ok': True})
    except Exception as exc:
        safe_msg = log_error(exc, f'delete_notebook_entry uid={uid} entry={eid}')
        return jsonify({'error': safe_msg}), 500


# ── Static data endpoints ──────────────────────────────────────────────────


@app.get('/api/curriculum')
def get_curriculum():
    """Serve the full curriculum JSON from the project root."""
    try:
        curriculum_path = os.path.join(os.path.dirname(__file__), '..', 'curriculum.json')
        with open(os.path.realpath(curriculum_path), 'r', encoding='utf-8') as fh:
            return app.response_class(
                response=fh.read(),
                status=200,
                mimetype='application/json',
            )
    except FileNotFoundError:
        return jsonify({'error': 'curriculum.json not found.'}), 404
    except Exception as exc:
        safe_msg = log_error(exc, 'get_curriculum')
        return jsonify({'error': safe_msg}), 500


@app.get('/api/dictionary')
def get_dictionary():
    """Serve the full dictionary JSON from the project root."""
    try:
        dictionary_path = os.path.join(os.path.dirname(__file__), '..', 'dictionary.json')
        with open(os.path.realpath(dictionary_path), 'r', encoding='utf-8') as fh:
            return app.response_class(
                response=fh.read(),
                status=200,
                mimetype='application/json',
            )
    except FileNotFoundError:
        return jsonify({'error': 'dictionary.json not found.'}), 404
    except Exception as exc:
        safe_msg = log_error(exc, 'get_dictionary')
        return jsonify({'error': safe_msg}), 500


# ── Error handlers ─────────────────────────────────────────────────────────


@app.errorhandler(404)
def not_found(_err):
    return jsonify({'error': 'Not found.'}), 404


@app.errorhandler(405)
def method_not_allowed(_err):
    return jsonify({'error': 'Method not allowed.'}), 405


@app.errorhandler(500)
def internal_error(err):
    safe_msg = log_error(err, 'unhandled')
    return jsonify({'error': safe_msg}), 500


# ── Entry point ────────────────────────────────────────────────────────────

if __name__ == '__main__':
    from dotenv import load_dotenv

    load_dotenv()

    port = int(os.getenv('FLASK_PORT', 3001))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'

    log_info(f'Starting picklePi backend on port {port} (debug={debug})')
    app.run(host='127.0.0.1', port=port, debug=debug)
