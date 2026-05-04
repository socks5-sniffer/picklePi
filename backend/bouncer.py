"""
Input sanitisation (Bouncer) for picklePi backend.

All user-supplied strings must pass through these helpers before being stored
or reflected in any response.  The module uses the *bleach* library to strip
HTML and JavaScript payloads, enforces safe filename/path handling to prevent
directory-traversal attacks, and provides typed value validators.
"""

import os
import re
import uuid

import bleach


# ── Constants ──────────────────────────────────────────────────────────────

# Characters that are safe in a progress / notebook field value
_TEXT_ALLOWED_TAGS: list[str] = []          # no HTML tags permitted
_TEXT_ALLOWED_ATTRS: dict[str, list] = {}   # no attributes permitted

# Maximum field lengths (characters)
MAX_USERNAME_LENGTH = 50
MAX_TEXT_FIELD_LENGTH = 4000   # lab-notebook free-text answers
MAX_ID_LENGTH = 128


# ── String sanitisation ────────────────────────────────────────────────────

def sanitise_string(value: object, max_length: int = MAX_TEXT_FIELD_LENGTH) -> str:
    """
    Strip all HTML tags / attributes from *value* and truncate to *max_length*.

    Raises ``TypeError`` if *value* is not a string.
    """
    if not isinstance(value, str):
        raise TypeError(f'Expected str, got {type(value).__name__}')

    cleaned = bleach.clean(value, tags=_TEXT_ALLOWED_TAGS, attributes=_TEXT_ALLOWED_ATTRS, strip=True)
    return cleaned[:max_length]


def sanitise_username(value: object) -> str:
    """
    Validate and sanitise a username.

    Allows only alphanumeric characters, hyphens, and underscores.
    Raises ``ValueError`` on invalid input.
    """
    raw = sanitise_string(value, MAX_USERNAME_LENGTH)
    if not re.fullmatch(r'[A-Za-z0-9_\-]+', raw):
        raise ValueError('Username may only contain letters, digits, hyphens, and underscores.')
    return raw


# ── Identifier validators ──────────────────────────────────────────────────

def sanitise_user_id(value: object) -> str:
    """
    Accept a Firebase UID or UUID-style user identifier.

    Allows alphanumeric characters plus hyphens and underscores (Firebase UIDs
    consist of URL-safe base64 characters).
    Raises ``ValueError`` for unexpected characters or excessive length.
    """
    raw = sanitise_string(value, MAX_ID_LENGTH)
    if not re.fullmatch(r'[A-Za-z0-9_\-]+', raw):
        raise ValueError('Invalid userId format.')
    return raw


def sanitise_entry_id(value: object) -> str:
    """
    Validate a lab-notebook entry ID (UUID format).

    Raises ``ValueError`` if the value is not a valid UUID.
    """
    raw = sanitise_string(value, MAX_ID_LENGTH)
    try:
        uuid.UUID(raw)
    except ValueError as exc:
        raise ValueError('entryId must be a valid UUID.') from exc
    return raw


# ── Numeric validators ─────────────────────────────────────────────────────

def sanitise_int(value: object, min_val: int | None = None, max_val: int | None = None) -> int:
    """
    Coerce *value* to an integer and enforce optional bounds.

    Raises ``TypeError`` or ``ValueError`` on invalid input.
    """
    try:
        result = int(value)
    except (TypeError, ValueError) as exc:
        raise TypeError(f'Expected an integer, got {type(value).__name__}') from exc

    if min_val is not None and result < min_val:
        raise ValueError(f'Value {result} is below the minimum ({min_val}).')
    if max_val is not None and result > max_val:
        raise ValueError(f'Value {result} exceeds the maximum ({max_val}).')
    return result


# ── Path / filename safety ─────────────────────────────────────────────────

def sanitise_filename(value: object) -> str:
    """
    Return a safe basename from *value*, blocking directory-traversal attempts.

    Raises ``ValueError`` if the input contains path separators or traversal
    sequences, or if the resulting filename is empty.
    """
    raw = sanitise_string(value, 255)

    # Reject any input that contains path-traversal or separator characters
    # before calling basename — this is the primary traversal guard.
    # Both '/' and '\\' are checked explicitly because on Windows os.sep is '\\'
    # but Python also accepts '/' as a path separator, so both must be blocked.
    if '..' in raw or '/' in raw or '\\' in raw:
        raise ValueError('Invalid or unsafe filename.')

    base = os.path.basename(raw)
    if not base:
        raise ValueError('Filename must not be empty.')
    return base
