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
_file_handler = RotatingFileHandler(
    'app.log',
    maxBytes=5 * 1024 * 1024,  # 5 MB per file
    backupCount=3,
)
_file_handler.setLevel(logging.DEBUG)
_file_handler.setFormatter(
    logging.Formatter('%(asctime)s  %(levelname)-8s  %(name)s  %(message)s')
)

# stderr shows warnings and above, but NEVER exception details
_stderr_handler = logging.StreamHandler()
_stderr_handler.setLevel(logging.WARNING)
_stderr_handler.setFormatter(logging.Formatter('%(levelname)s %(name)s: %(message)s'))

logger = logging.getLogger('picklePi')
logger.setLevel(logging.DEBUG)
logger.addHandler(_file_handler)
logger.addHandler(_stderr_handler)


# ── Public helpers ─────────────────────────────────────────────────────────

def log_error(exc: Exception, context: str = '') -> None:
    """
    Log *exc* with full traceback to app.log only.

    The detailed trace is written at DEBUG level so it only reaches the
    rotating file handler (the stderr handler threshold is WARNING).
    This ensures stack-trace information is never forwarded to an external
    consumer via standard output.
    """
    summary = f'{context}: {type(exc).__name__}' if context else type(exc).__name__
    logger.error('Internal error — %s', summary)
    logger.debug('Full traceback:\n%s', traceback.format_exc())


def log_warning(msg: str) -> None:
    """Log a warning-level message."""
    logger.warning(msg)


def log_info(msg: str) -> None:
    """Log an info-level message."""
    logger.info(msg)
