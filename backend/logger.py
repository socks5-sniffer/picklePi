import logging
import os
from datetime import datetime

class TattleTale:
    """
    Handles logging securely.
    Ensures technical details are saved to a file, NOT shown to the user.
    """
    
    # Configure the logging system upon initialization
    # We set it to append to 'app.log'
    logging.basicConfig(
        filename='app.log',
        level=logging.ERROR,
        format='%(asctime)s - %(levelname)s - %(message)s',
        encoding='utf-8'
    )

    @staticmethod
    def record_error(error_message, user_context="Anonymous"):
        """
        Logs the raw, ugly error details to the secret log file.
        """
        # We assume the error_message might contain sensitive info (like stack traces)
        # So we ONLY write it to the file.
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Log it!
        logging.error(f"[{user_context}] {error_message}")
        
        print(f"[LOGGED]: Error saved to app.log at {timestamp}")

    @staticmethod
    def get_safe_message():
        """
        Returns a generic, boring message for the user.
        """
        return "WARNING: An internal error occurred. Our security team has been notified."

# --- TEST TIME ---
if __name__ == "__main__":
    try:
        # Let's simulate a crash!
        x = 1 / 0  # Math is hard.
    except Exception as e:
        print("--- SCENARIO: APP CRASHED ---")
        
        # 1. The Secure Log (The Tattle Tale)
        # We send the real error ("division by zero") to the file
        TattleTale.record_error(str(e), user_context="Admin_Erik")
        
        # 2. The Public Face
        # We show the user the polite lie
        print(f"USER SEES: {TattleTale.get_safe_message()}")
        
        # 3. Verification
        print("\n--- CHECKING THE LOG FILE ---")
        if os.path.exists("app.log"):
            with open("app.log", "r") as f:
                print(f.read())
        else:
            print("❌ Log file missing!")
            