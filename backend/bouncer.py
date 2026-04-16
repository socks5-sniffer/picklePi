import bleach
import os
import re

class Bouncer:
    """
    The Bouncer handles all input sanitization.
    If it looks dangerous, the Bouncer kicks it out.
    """

    @staticmethod
    def clean_text(user_input):
        """
        Strips all HTML tags and attributes from text.
        Prevents XSS (Cross-Site Scripting) attacks.
        """
        if not isinstance(user_input, str):
            return str(user_input)
            
        # bleach.clean() removes tags. 
        # strip=True removes the tag completely (<script> becomes nothing).
        cleaned_data = bleach.clean(user_input, tags=[], attributes={}, strip=True)
        return cleaned_data

    @staticmethod
    def clean_filename(filename):
        """
        Ensures a filename only contains safe characters.
        Prevents Path Traversal attacks (e.g., ../../etc/passwd).
        """
        # 1. Strip directory paths (no folders allowed)
        filename = os.path.basename(filename)
        
        # 2. Allow only alphanumeric, dashes, underscores, and dots
        # This Regex says: "If it's NOT a letter, number, -, _, or ., delete it."
        clean_name = re.sub(r'[^a-zA-Z0-9_.-]', '', filename)
        
        return clean_name

    @staticmethod
    def validate_integer(value, default=0):
        """
        Ensures input is strictly a number (good for IDs, scores, etc).
        Prevents SQL Injection via numeric fields.
        """
        try:
            return int(value)
        except (ValueError, TypeError):
            return default

# --- TEST TIME (How you use it) ---
if __name__ == "__main__":
    # Scenario 1: The XSS Attack
    nasty_input = "<script>steal_cookies()</script>Erik"
    print(f"Original: {nasty_input}")
    print(f"Cleaned:  {Bouncer.clean_text(nasty_input)}") 
    # Output: Erik

    # Scenario 2: The Path Traversal Attack
    nasty_file = "../../windows/system32/hack.exe"
    print(f"Original: {nasty_file}")
    print(f"Cleaned:  {Bouncer.clean_filename(nasty_file)}")
    # Output: hack.exe (harmless without the path)
    