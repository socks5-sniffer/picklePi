class SecurityHeaders:
    """
    The 'Helmet' for your HTTP responses.
    This class generates the standard security headers that should
    be attached to EVERY response sent to a client.
    """

    @staticmethod
    def get_headers():
        return {
            # 1. Strict-Transport-Security (HSTS)
            # Tells browser: "NEVER talk to me over HTTP. Only HTTPS."
            # max-age=31536000 is one year in seconds.
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains",

            # 2. X-Content-Type-Options
            # Tells browser: "If I say it's text, treat it as text. Do not guess."
            # Stops 'MIME Sniffing' attacks.
            "X-Content-Type-Options": "nosniff",

            # 3. X-Frame-Options
            # Tells browser: "Do not let anyone put my site in an iframe."
            # Stops 'Clickjacking' attacks.
            "X-Frame-Options": "DENY",

            # 4. Content-Security-Policy (CSP)
            # The big boss. Controls where resources can load from.
            # 'default-src 'self'' means: "Only load scripts/images from MY domain."
            "Content-Security-Policy": "default-src 'self'; script-src 'self' https://apis.google.com",
            
            # 5. Referrer-Policy
            # Controls how much info you leak when linking to other sites.
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }

# --- TEST TIME ---
if __name__ == "__main__":
    headers = SecurityHeaders.get_headers()
    print("🛡️  SECURE HEADERS GENERATED:")
    print("-----------------------------")
    for key, value in headers.items():
        print(f"[{key}]: {value}")
    print("-----------------------------")
    print("✅ The Helmet is ready.")
    