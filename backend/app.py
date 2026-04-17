import os
import firebase_admin
from firebase_admin import credentials, auth, firestore # <--- Add firestore
from flask import Flask, request, jsonify
from flask_cors import CORS
from bouncer import Bouncer
from middleware import SecurityHeaders
from logger import TattleTale


class Config:
    """
    Local fallback configuration used by this module so the backend
    can start even when no separate config.py file is present.
    """

    FLASK_ENV = os.getenv("FLASK_ENV", "production")

    @classmethod
    def validate(cls):
        allowed_envs = {"development", "production", "testing"}
        if cls.FLASK_ENV not in allowed_envs:
            raise ValueError(
                f"Invalid FLASK_ENV '{cls.FLASK_ENV}'. "
                f"Expected one of: {', '.join(sorted(allowed_envs))}"
            )
# Initialize Firebase Admin SDK
# (Make sure firebase-secret.json is in the same folder!)
try:
    cred = credentials.Certificate("firebase-secret.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client() # <--- Connect to the Vault
    print("✅ Firebase Admin SDK & Database Loaded.")
except Exception as e:
    print(f"⚠️ Warning: Firebase failed to load: {e}")

# 1. Initialize the Flask App
app = Flask(__name__)

# 2. Enable CORS (Allow Faithville Frontend to talk to us)
# Allow cross-origin requests, but do not permit credentials from every origin.
# If credentialed cross-origin requests are needed later, replace "*" with a trusted origin allowlist.
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)

# 3. Security Check (The Pre-Flight)
try:
    Config.validate()
    print("[OK] Security Config Loaded.")
except ValueError as e:
    TattleTale.record_error(f"Startup Failed: {e}", "SYSTEM")
    print(f"[ERROR] FATAL ERROR: {e}")
    exit(1)

# 4. Apply The Helmet (Middleware)
@app.after_request
def apply_security_headers(response):
    headers = SecurityHeaders.get_headers()
    for key, value in headers.items():
        response.headers[key] = value
    return response

# --- THE API ENDPOINTS (The "Service Counter") ---

@app.route('/api/status', methods=['GET'])
def health_check():
    """
    A simple heartbeat check.
    Frontend asks: "Are you alive?"
    Backend says: "Yes, and I am secure."
    """
    return jsonify({"status": "online", "secure": True}), 200

@app.route('/api/login', methods=['POST'])
def login():
    """
    Handles user login requests safely.
    """
    data = request.get_json()
    raw_username = data.get("username", "")
    
    # THE BOUNCER ACTS HERE
    # We clean the input before we even look at it.
    clean_username = Bouncer.clean_text(raw_username)
    
    if not clean_username:
        TattleTale.record_error("Empty or malicious username attempt", "Auth_System")
        return jsonify({"error": "Invalid input"}), 400
        
    # Logic placeholder (later this will check the DB)
    print(f"Login Attempt: {clean_username}")
    
    if clean_username == "Admin_Erik":
        return jsonify({"message": "Welcome, Commander.", "token": "DEMO_TOKEN_REPLACE_IN_PRODUCTION"}), 200
    else:
        return jsonify({"error": "Access Denied"}), 401

@app.route('/api/verify-token', methods=['POST', 'OPTIONS'])
def verify_token():
    # 1. Handle CORS Pre-Flight
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing token"}), 401
    
    id_token = auth_header.split("Bearer ")[1]

    try:
        # 2. Verify the Wristband
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        email = decoded_token.get('email', '')
        name = decoded_token.get('name', 'Unknown')
        picture = decoded_token.get('picture', '')

        # 3. TALK TO THE VAULT (Firestore)
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()

        if user_doc.exists:
            # User exists: Update their profile with latest Google info
            # but KEEP their existing game stats (Faith Points)
            user_data = user_doc.to_dict()
            user_ref.set({
                'email': email,
                'displayName': name,
                'photoURL': picture,
                'lastLogin': firestore.SERVER_TIMESTAMP
            }, merge=True) # <--- 'merge=True' protects your Faith Points!
            
            # Use the DB points, or default to 100 if missing
            current_points = user_data.get('faithPoints', 100)
            role = user_data.get('role', 'Settler')
            
        else:
            # First time user? Create the record.
            current_points = 100
            role = 'Settler'
            user_ref.set({
                'uid': uid,
                'email': email,
                'displayName': name,
                'photoURL': picture,
                'faithPoints': current_points,
                'role': role,
                'createdAt': firestore.SERVER_TIMESTAMP
            })

        print(f"🔓 ACCESS GRANTED: {email} | Points: {current_points}")
        
        # 4. Return the Real Data to Frontend
        return jsonify({
            "status": "success",
            "uid": uid,
            "faithPoints": current_points,
            "role": role,
            "message": f"Welcome back, Commander {name}"
        }), 200

    except Exception as e:
        TattleTale.record_error(f"Token verification failed: {e}", "AUTH")
        print("⛔ ACCESS DENIED: Invalid token")
        return jsonify({"error": "Invalid token"}), 401
@app.route('/api/missions', methods=['GET', 'OPTIONS'])
def get_missions():
    # 1. CORS Pre-Flight
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    # 2. Security Check (The Bouncer)
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing token"}), 401

    try:
        # Verify token validity (we don't need the UID for this, just validity)
        id_token = auth_header.split("Bearer ")[1]
        auth.verify_id_token(id_token)

        # 3. Query the Vault
        # Check if the frontend requested a specific zone (e.g., ?zone=downtown)
        zone_id = request.args.get('zone')
        
        missions_ref = db.collection('missions')
        
        if zone_id:
            # If a zone is requested, filter by it
            query = missions_ref.where('zone_id', '==', zone_id).limit(20)
        else:
            # Otherwise, just grab a handful to show
            query = missions_ref.limit(20)

        results = query.stream()

        # 4. Pack the Truck
        mission_list = []
        for doc in results:
            mission = doc.to_dict()
            mission['id'] = doc.id  # Attach the ID so we can click it later
            mission_list.append(mission)

        print(f"📦 SHIPMENT: Sending {len(mission_list)} missions to frontend.")
        return jsonify(mission_list), 200

    except Exception as e:
        print(f"🔥 ERROR: Could not fetch missions: {e}")
        return jsonify({"error": str(e)}), 500
@app.route('/api/complete-mission', methods=['POST', 'OPTIONS'])
def complete_mission():
    # 1. CORS & Security
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing token"}), 401

    try:
        # Verify User
        id_token = auth_header.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']

        # Get the Mission ID from the request
        data = request.json
        mission_id = data.get('missionId')
        
        if not mission_id:
            return jsonify({"error": "Mission ID required"}), 400

        # --- THE ATOMIC TRANSACTION ---
        # We define the transaction function first
        @firestore.transactional
        def process_mission(transaction, mission_ref, user_ref):
            # 1. READ ALL DOCUMENTS FIRST (Firestore Rule: Reads before Writes!)
            mission_snapshot = mission_ref.get(transaction=transaction)
            user_snapshot = user_ref.get(transaction=transaction)

            if not mission_snapshot.exists:
                raise Exception("Mission not found")
            
            mission_data = mission_snapshot.to_dict()
            user_data = user_snapshot.to_dict()

            # Get zone_id early so we can read the zone document
            zone_id = mission_data.get('zone_id')
            zone_snapshot = None
            if zone_id:
                zone_ref = db.collection('zones').document(zone_id)
                zone_snapshot = zone_ref.get(transaction=transaction)

            # 2. CALCULATE COSTS
            difficulty = mission_data.get('difficulty', 1)
            rewards = mission_data.get('rewards', 10)
            
            cost_donations = difficulty * 50
            required_volunteers = difficulty * 2

            # 3. CHECK BALANCE (The Guard)
            current_donations = user_data.get('donations', 0)
            current_volunteers = user_data.get('volunteers', 0)
            current_faith = user_data.get('faithPoints', 0)

            if current_volunteers < required_volunteers:
                raise Exception(f"Not enough staff! Need {required_volunteers} volunteers.")
            
            if current_donations < cost_donations:
                raise Exception(f"Insufficient funds! Need ${cost_donations}.")

            # 4. EXECUTE TRADE
            new_donations = current_donations - cost_donations
            new_faith = current_faith + rewards

            # 5. UPDATE DATABASE (NOW we write everything)
            # A. Update the User's Wallet
            transaction.update(user_ref, {
                'donations': new_donations,
                'faithPoints': new_faith
            })
            
            # B. Lock the Mission (The Farming Fix)
            # We change status to 'cooldown' so it can't be clicked again.
            transaction.update(mission_ref, {
                'status': 'cooldown', 
                'completedBy': uid,
                'completedAt': firestore.SERVER_TIMESTAMP
            })

            # C. HEAL THE ZONE
            new_zone_health = None  # Track the new health to send to frontend
            if zone_id:
                zone_ref = db.collection('zones').document(zone_id)
                heal_amount = difficulty * 2  # Harder missions heal more
                
                if zone_snapshot and zone_snapshot.exists:
                    zone_data = zone_snapshot.to_dict()
                    current_health = zone_data.get('supportProgress', 50)  # Use existing supportProgress field
                    new_zone_health = min(100, current_health + heal_amount) # Cap at 100%
                    transaction.update(zone_ref, {'supportProgress': new_zone_health})
                else:
                    # Create zone if it doesn't exist yet
                    new_zone_health = min(100, 50 + heal_amount)
                    transaction.set(zone_ref, {'supportProgress': new_zone_health})
            
            return {
                "donations": new_donations,
                "faithPoints": new_faith,
                "volunteers": current_volunteers,
                "newZoneHealth": new_zone_health,  # Send back to frontend
                "message": f"Mission Success! -${cost_donations}, +{rewards} Faith"
            }

        # --- RUN THE TRANSACTION ---
        mission_ref = db.collection('missions').document(mission_id)
        user_ref = db.collection('users').document(uid)
        
        transaction = db.transaction()
        result = process_mission(transaction, mission_ref, user_ref)
        
        print(f"✅ TRANSACTION COMPLETE: {result['message']}")
        return jsonify(result), 200

    except Exception as e:
        print(f"⛔ TRANSACTION FAILED: {e}")
        return jsonify({"error": str(e)}), 400
        
# --- RUN THE SERVER ---
if __name__ == "__main__":
    # We run on port 5000 (standard for Flask)
    # debug=Config.DEBUG pulls from your .env file
    print("[STARTING] Faithville Security Backend Starting on Port 5000...")
    app.run(port=5000, debug=Config.DEBUG)
    