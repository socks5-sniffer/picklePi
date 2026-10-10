"""Credential-free smoke tests for the optional Flask API."""

import importlib
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from firebase_admin import firestore


class FakeSnapshot:
    def __init__(self, value):
        self.value = value
        self.exists = value is not None

    def to_dict(self):
        return self.value.copy() if self.value is not None else None


class FakeDocument:
    def __init__(self, store, uid):
        self.store = store
        self.uid = uid

    def get(self, transaction=None):
        return FakeSnapshot(self.store.get(self.uid))

    def set(self, value, merge=False):
        existing = self.store.get(self.uid, {}) if merge else {}
        for key, field in value.items():
            if isinstance(field, firestore.ArrayUnion):
                existing[key] = [*existing.get(key, []), *field.values]
            else:
                existing[key] = field
        self.store[self.uid] = existing

    def update(self, value):
        self.store[self.uid].update(value)


class FakeTransaction:
    def set(self, ref, value, merge=False):
        ref.set(value, merge=merge)

    def update(self, ref, value):
        ref.update(value)


class FakeDB:
    def __init__(self):
        self.store = {}

    def collection(self, name):
        assert name == "progress"
        return self

    def document(self, uid):
        return FakeDocument(self.store, uid)

    def transaction(self):
        return FakeTransaction()


class BackendSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        cls.credentials_file = tempfile.NamedTemporaryFile(delete=False)
        cls.credentials_file.close()
        cls.db = FakeDB()
        with (
            patch.dict(os.environ, {"FIREBASE_CREDENTIALS": cls.credentials_file.name}),
            patch("dotenv.load_dotenv"),
            patch("firebase_admin.credentials.Certificate"),
            patch("firebase_admin.initialize_app"),
            patch("firebase_admin.firestore.client", return_value=cls.db),
            patch("firebase_admin.firestore.transactional", side_effect=lambda fn: fn),
        ):
            cls.api = importlib.import_module("app")

    @classmethod
    def tearDownClass(cls):
        os.unlink(cls.credentials_file.name)
        sys.path.remove(str(Path(__file__).resolve().parent))

    def setUp(self):
        self.db.store.clear()
        self.client = self.api.app.test_client()
        self.auth = {"Authorization": "Bearer valid", "X-Requested-With": "XMLHttpRequest"}
        self.token_patch = patch.object(self.api.auth, "verify_id_token", return_value={"uid": "alice"})
        self.token_patch.start()
        self.addCleanup(self.token_patch.stop)
        transaction_patch = patch.object(self.api.firestore, "transactional", side_effect=lambda fn: fn)
        transaction_patch.start()
        self.addCleanup(transaction_patch.stop)

    def test_health_headers_and_http_errors(self):
        status = self.client.get("/api/status")
        self.assertEqual(status.status_code, 200)
        self.assertEqual(status.json["status"], "online")
        self.assertEqual(status.headers["Cache-Control"], "no-store")
        self.assertEqual(self.client.get("/api/progress/alice").status_code, 401)
        self.assertEqual(self.client.post("/api/verify-token", headers=self.auth).status_code, 200)
        self.assertEqual(self.client.post("/api/status", headers=self.auth).status_code, 405)
        self.assertEqual(self.client.put("/api/progress/alice", data=b"x" * (512 * 1024 + 1), content_type="application/json", headers=self.auth).status_code, 413)

    def test_user_isolation_and_progress_round_trip(self):
        progress = {"projectStatuses": {}, "badges": [], "labNotebook": []}
        self.assertEqual(self.client.put("/api/progress/bob", json=progress, headers=self.auth).status_code, 403)
        self.assertEqual(self.client.put("/api/progress/alice", json=progress, headers=self.auth).status_code, 200)
        self.assertEqual(self.client.get("/api/progress/alice", headers=self.auth).json, progress)
        self.assertEqual(self.client.put("/api/progress/alice", json={"badges": []}, headers=self.auth).status_code, 400)

    def test_notebook_create_and_delete(self):
        entry = {"projectId": "p1", "whatWorked": "<b>yes</b>", "whatDidnt": "", "whatChanged": "", "oneThingLearned": ""}
        created = self.client.post("/api/progress/alice/notebook", json=entry, headers=self.auth)
        self.assertEqual(created.status_code, 201)
        self.assertEqual(created.json["whatWorked"], "yes")
        self.assertEqual(len(self.db.store["alice"]["labNotebook"]), 1)
        deleted = self.client.delete(f"/api/progress/alice/notebook/{created.json['id']}", headers=self.auth)
        self.assertEqual(deleted.status_code, 204)
        self.assertEqual(self.db.store["alice"]["labNotebook"], [])

    def test_notebook_limit(self):
        self.db.store["alice"] = {"labNotebook": [{}] * self.api.MAX_NOTEBOOK_ENTRIES}
        entry = {"projectId": "p1", "whatWorked": "", "whatDidnt": "", "whatChanged": "", "oneThingLearned": ""}
        result = self.client.post("/api/progress/alice/notebook", json=entry, headers=self.auth)
        self.assertEqual(result.status_code, 400)
        self.assertEqual(len(self.db.store["alice"]["labNotebook"]), self.api.MAX_NOTEBOOK_ENTRIES)


if __name__ == "__main__":
    unittest.main()
