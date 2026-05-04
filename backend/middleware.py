"""
HTTP security-header middleware for picklePi backend.

Call ``apply_security_headers(app)`` once during Flask application
initialisation.  Every response — including error responses — will
automatically receive the full header suite defined here.
"""

import os
from flask import Flask


def apply_security_headers(app: Flask) -> None:
    """
    Register an ``after_request`` hook that attaches security headers to
    every HTTP response issued by *app*.

    Headers applied
    ---------------
    Strict-Transport-Security
        Forces HTTPS for one year (including sub-domains) and opts the
        origin into the HSTS preload list.  Only active in production.

    X-Frame-Options
        Prevents the page from being embedded in any ``<iframe>`` or
        ``<frame>``, mitigating clickjacking attacks.

    X-Content-Type-Options
        Stops browsers from MIME-sniffing a response away from the
        declared ``Content-Type``.

    Content-Security-Policy
        Restricts resource loading to the same origin; blocks inline
        scripts and unsafe ``eval()`` calls.

    Referrer-Policy
        Sends the full URL for same-origin requests; only the origin for
        cross-origin requests.

    Permissions-Policy
        Disables access to the camera, microphone, and geolocation APIs.

    Cache-Control
        Prevents sensitive API responses from being cached by browsers or
        intermediate proxies.
    """

    is_production = os.getenv('FLASK_ENV', 'development') == 'production'

    @app.after_request
    def _add_headers(response):
        # HSTS — only meaningful over HTTPS; skip in development to avoid
        # locking out an HTTP-only local server.
        if is_production:
            response.headers['Strict-Transport-Security'] = (
                'max-age=31536000; includeSubDomains; preload'
            )

        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Content-Security-Policy'] = (
            "default-src 'none'; "
            "frame-ancestors 'none'"
        )
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response.headers['Permissions-Policy'] = (
            'camera=(), microphone=(), geolocation=()'
        )
        # Prevent browsers / proxies from caching API responses.
        response.headers['Cache-Control'] = 'no-store'
        response.headers['Pragma'] = 'no-cache'

        return response
