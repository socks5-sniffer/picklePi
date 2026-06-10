"""Secure error logger — detailed traces to app.log, safe messages to client.

Detailed exception information (stack traces, request context) is written to
``backend/app.log`` only. Handlers return an opaque error id that can be
correlated with the log file, so internals are never leaked to the client.
"""

import logging
import os
import uuid
from logging.handlers import RotatingFileHandler

LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app.log")

logger = logging.getLogger("picklepi")
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = RotatingFileHandler(LOG_FILE, maxBytes=1_000_000, backupCount=3)
    handler.setFormatter(
        logging.Formatter("%(asctime)s %(levelname)s [%(name)s] %(message)s")
    )
    logger.addHandler(handler)


def log_exception(message: str) -> str:
    """Log the current exception with full traceback; return an opaque error id.

    The returned id is safe to include in HTTP responses — it carries no
    information beyond a lookup key for app.log.
    """
    error_id = uuid.uuid4().hex[:12]
    logger.exception("[error_id=%s] %s", error_id, message)
    return error_id
