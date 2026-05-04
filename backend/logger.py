"""
Secure error logger for picklePi backend.

Writes detailed error information (stack traces, context) to app.log only.
HTTP responses always receive a generic, safe message — never raw internal
details that could expose application internals to an attacker.
"""

import logging
import traceback
from logging.handlers import RotatingFileHandler

# ── Log setup ──────────────────────────────────────────────────────────────
_handler = RotatingFileHandler(
    'app.log',
    maxBytes=5 * 1024 * 1024,  # 5 MB per file
    backupCount=3,
)
_handler.setFormatter(
    logging.Formatter('%(asctime)s  %(levelname)-8s  %(name)s  %(message)s')
)

logger = logging.getLogger('picklePi')
logger.setLevel(logging.DEBUG)
logger.addHandler(_handler)

# Also log warnings and above to stderr so they appear in systemd/container logs
_stderr = logging.StreamHandler()
_stderr.setLevel(logging.WARNING)
_stderr.setFormatter(logging.Formatter('%(levelname)s %(name)s: %(message)s'))
logger.addHandler(_stderr)


# ── Public helpers ─────────────────────────────────────────────────────────

def log_error(exc: Exception, context: str = '') -> str:
    """
    Log *exc* with full traceback to app.log.

    Returns a generic, client-safe message string (never the real exception
    text) so callers can safely forward it to the HTTP response.
    """
    detail = traceback.format_exc()
    message = f'{context}: {exc}' if context else str(exc)
    logger.error('%s\n%s', message, detail)
    return 'An internal error occurred. Please try again later.'


def log_warning(msg: str) -> None:
    """Log a warning-level message."""
    logger.warning(msg)


def log_info(msg: str) -> None:
    """Log an info-level message."""
    logger.info(msg)
