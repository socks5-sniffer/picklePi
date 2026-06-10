"""HTTP security headers (HSTS, CSP, X-Frame-Options, …) on every response."""

from flask import Flask

# This API serves JSON only — it never renders HTML — so the CSP can be fully
# locked down. The frontend's (different) CSP lives in vercel.json,
# public/_headers and vite.config.ts.
API_CSP = "default-src 'none'; frame-ancestors 'none'"

SECURITY_HEADERS = {
    "Content-Security-Policy": API_CSP,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    # Progress and notebook responses are per-user; never cache them.
    "Cache-Control": "no-store",
}


def apply_security_headers(app: Flask) -> None:
    @app.after_request
    def _set_headers(response):
        for header, value in SECURITY_HEADERS.items():
            response.headers.setdefault(header, value)
        return response
