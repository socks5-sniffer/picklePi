# picklePi Backend

A lightweight **Flask (Python)** API that provides server-side user accounts, token verification, and cloud-synced progress via Firestore.

> **The backend is optional.** The React frontend runs fully standalone using `localStorage`. The Flask API is only needed for persistent user accounts and cross-device progress sync.

---

## Architecture

```
backend/
├── app.py          # Flask entry point — initialises Firebase, registers routes, wires middleware
├── bouncer.py      # Input sanitisation — strips XSS payloads, blocks path traversal, validates types
├── middleware.py   # HTTP security headers (HSTS, CSP, X-Frame-Options, …) on every response
└── logger.py       # Secure error logger — detailed traces to app.log, safe messages to client
```

## API Endpoints

Sign-in itself happens client-side with the Firebase Auth SDK — there is no
username/password endpoint on this API. The client sends the resulting ID
token as `Authorization: Bearer <token>` on the routes marked 🔒 below.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/api/status` | — | Health check — `{"status": "online", "secure": true}` |
| `POST` | `/api/verify-token` | 🔒 | Validate Firebase ID token, return `{"uid": …}` |
| `GET` | `/api/progress/:userId` | 🔒 | Fetch the caller's full progress object |
| `PUT` | `/api/progress/:userId` | 🔒 | Persist the caller's progress object |
| `POST` | `/api/progress/:userId/notebook` | 🔒 | Create a new lab notebook entry |
| `DELETE` | `/api/progress/:userId/notebook/:entryId` | 🔒 | Delete a lab notebook entry |
| `GET` | `/api/curriculum` | — | Serve the full curriculum JSON |
| `GET` | `/api/dictionary` | — | Serve the full dictionary JSON |

On every 🔒 route the `:userId` in the URL must equal the `uid` inside the
verified token; any mismatch returns `403`. This prevents one user from
reading or overwriting another user's progress (IDOR).

## Setup

### 1. Install Python dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Add Firebase credentials

Place your `firebase-secret.json` service-account key inside `backend/`. This file is excluded from version control via `.gitignore`.

### 3. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp backend/.env.example backend/.env
```

### 4. Start the server

```bash
cd backend
python app.py
```

The API will be available at `http://localhost:3001` by default — matching the `/api` proxy already configured in `vite.config.ts`.

## Security

- Firebase ID tokens are verified server-side on every authenticated request,
  and the authenticated `uid` must match the `:userId` in the URL (IDOR guard).
- All user-supplied strings pass through `bouncer.py` before use: identifiers
  are allowlist-matched (blocking path traversal), free text is stripped of
  HTML via bleach and length-capped.
- State-changing requests (`POST`/`PUT`/`DELETE`) must carry
  `X-Requested-With: XMLHttpRequest`, forcing a CORS preflight so cross-origin
  pages cannot fire them (CSRF defence; the frontend sets this header in
  `src/lib/api.ts`).
- CORS origins come from the `CORS_ORIGINS` environment variable — no
  wildcard.
- Detailed error information is written to `app.log` only — clients receive a
  generic message plus an opaque `errorId` for log correlation.
- Every response includes a full set of security headers (see `middleware.py`).
- The server binds to `127.0.0.1` and only enables Flask debug mode when
  `FLASK_ENV=development`.

### Wiring the frontend

`src/lib/api.ts` currently uses a hardcoded `USER_ID = 'default'` and sends no
token, so authenticated routes will return `401` and the app falls back to
`localStorage` (its documented offline behaviour). To enable cloud sync, add
the Firebase Auth client SDK to the frontend, register a token provider via
`setAuthTokenProvider(() => user.getIdToken())`, and replace `USER_ID` with
the signed-in user's `uid`.

## Database

See [`db-schema.txt`](../db-schema.txt) in the repository root for the full relational schema. The backend currently targets **Firestore** for document storage; the SQL schema is provided as a migration reference should a PostgreSQL backend be preferred later.
