"""Input sanitisation — strips XSS payloads, blocks path traversal, validates types.

Every user-supplied value crosses this module before it is stored or echoed
back. Identifiers are matched against a strict allowlist pattern (which also
rules out path traversal), and free-text fields are stripped of all HTML via
bleach.
"""

import re

import bleach

# Identifiers (user ids, project ids, notebook entry ids) — no dots or
# slashes, so traversal sequences like "../" can never validate.
_ID_RE = re.compile(r"^[A-Za-z0-9_-]{1,64}$")

# Strip ASCII control characters except \n and \t from free text.
_CONTROL_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")

MAX_TEXT_LEN = 2000  # matches maxLength on the frontend textareas
MAX_BADGES = 200
MAX_PROJECTS = 500
MAX_NOTEBOOK_ENTRIES = 1000

VALID_STATUSES = {"Not Started", "In Progress", "Completed"}

LAB_ENTRY_TEXT_FIELDS = ("whatWorked", "whatDidnt", "whatChanged", "oneThingLearned")


class ValidationError(ValueError):
    """Raised when client input fails validation; message is safe for clients."""


def validate_id(value, field="id"):
    if not isinstance(value, str) or not _ID_RE.match(value):
        raise ValidationError(f"invalid {field}")
    return value


def clean_text(value, field="text", max_len=MAX_TEXT_LEN):
    if not isinstance(value, str):
        raise ValidationError(f"{field} must be a string")
    if len(value) > max_len:
        raise ValidationError(f"{field} exceeds {max_len} characters")
    value = _CONTROL_RE.sub("", value)
    # tags=[] / strip=True removes all HTML rather than escaping it.
    return bleach.clean(value, tags=[], attributes={}, strip=True)


def sanitize_lab_entry(payload):
    """Validate and sanitise a notebook entry body (without id/date)."""
    if not isinstance(payload, dict):
        raise ValidationError("entry must be an object")
    entry = {"projectId": validate_id(payload.get("projectId"), "projectId")}
    for field in LAB_ENTRY_TEXT_FIELDS:
        entry[field] = clean_text(payload.get(field), field)
    return entry


def sanitize_progress(payload):
    """Validate and sanitise a full UserProgress object."""
    if not isinstance(payload, dict):
        raise ValidationError("progress must be an object")

    statuses = payload.get("projectStatuses")
    if not isinstance(statuses, dict) or len(statuses) > MAX_PROJECTS:
        raise ValidationError("invalid projectStatuses")
    clean_statuses = {}
    for project_id, status in statuses.items():
        validate_id(project_id, "projectId")
        if status not in VALID_STATUSES:
            raise ValidationError("invalid project status")
        clean_statuses[project_id] = status

    badges = payload.get("badges")
    if not isinstance(badges, list) or len(badges) > MAX_BADGES:
        raise ValidationError("invalid badges")
    clean_badges = [clean_text(b, "badge", max_len=100) for b in badges]

    notebook = payload.get("labNotebook")
    if not isinstance(notebook, list) or len(notebook) > MAX_NOTEBOOK_ENTRIES:
        raise ValidationError("invalid labNotebook")
    clean_notebook = []
    for raw in notebook:
        if not isinstance(raw, dict):
            raise ValidationError("entry must be an object")
        entry = sanitize_lab_entry(raw)
        entry["id"] = validate_id(raw.get("id"), "entry id")
        entry["date"] = clean_text(raw.get("date"), "date", max_len=64)
        clean_notebook.append(entry)

    return {
        "projectStatuses": clean_statuses,
        "badges": clean_badges,
        "labNotebook": clean_notebook,
    }
