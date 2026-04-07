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

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/status` | Health check — `{"status": "online", "secure": true}` |
| `POST` | `/api/login` | Accept username, sanitise via Bouncer, authenticate user |
| `POST` | `/api/verify-token` | Validate Firebase ID token, return user identity |
| `GET` | `/api/progress/:userId` | Fetch a user's full progress object |
| `PUT` | `/api/progress/:userId` | Persist a user's progress object |
| `POST` | `/api/progress/:userId/notebook` | Create a new lab notebook entry |
| `DELETE` | `/api/progress/:userId/notebook/:entryId` | Delete a lab notebook entry |
| `GET` | `/api/curriculum` | Serve the full curriculum JSON |
| `GET` | `/api/dictionary` | Serve the full dictionary JSON |

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

The API will be available at `http://localhost:5000` by default. The Vite dev server already proxies `/api` requests to `http://localhost:3001` — update `vite.config.ts` if you change the Flask port.

## Security

- All user-supplied strings pass through `bouncer.py` before use.
- Detailed error information is written to `app.log` only — never returned to the HTTP client.
- Every response includes a full set of security headers (see `middleware.py`).
- Firebase ID tokens are verified server-side on every authenticated request.

## Database

See [`db-schema.txt`](../db-schema.txt) in the repository root for the full relational schema. The backend currently targets **Firestore** for document storage; the SQL schema is provided as a migration reference should a PostgreSQL backend be preferred later.
