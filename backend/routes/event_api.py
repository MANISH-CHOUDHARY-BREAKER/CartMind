from flask import Blueprint, request, jsonify
from databases.database import db
from models.event import Event
import joblib
import pandas as pd

# -------------------------------
# INIT BLUEPRINT
# -------------------------------
event_bp = Blueprint("event_api", __name__)

# -------------------------------
# LOAD MODEL (NO circular import)
# -------------------------------
model = joblib.load("model.pkl")


# -------------------------------
# FEATURE EXTRACTION
# -------------------------------
def extract_features(user_id):
    events = Event.query.filter_by(user_id=user_id).all()

    if not events:
        return [0, 0, 0, 2]

    clicks = sum(1 for e in events if e.event_type == "click")
    time_spent = sum(e.value for e in events if e.event_type == "time_spent")
    cart = sum(1 for e in events if e.event_type == "add_to_cart")

    return [clicks, time_spent, cart, 2]


# -------------------------------
# TRACK EVENT + PREDICT
# -------------------------------
@event_bp.route("/track", methods=["POST"])
def track_event():
    try:
        data = request.json
        user_id = data.get("user_id", 1)

        # -------------------------------
        # 1. STORE EVENT
        # -------------------------------
        event = Event(
            user_id=user_id,
            event_type=data.get("event_type"),
            value=data.get("value", 1)
        )

        db.session.add(event)
        db.session.commit()

        # -------------------------------
        # 2. EXTRACT FEATURES
        # -------------------------------
        features_list = extract_features(user_id)

        clicks, time_spent, cart, last_login = features_list

        # Convert to DataFrame (important for sklearn warning fix)
        features = pd.DataFrame(
            [features_list],
            columns=["clicks", "time_spent", "cart_added", "last_login"]
        )

        # -------------------------------
        # 🔥 3. BEHAVIOR SCORING SYSTEM
        # -------------------------------
        score = (clicks * 2) + (time_spent * 0.5) + (cart * 5)

        # -------------------------------
        # 🔥 RULE 1: Low activity → wait
        # -------------------------------
        if score < 5:
            return jsonify({
                "prediction": 0,
                "confidence": 0.3,
                "action": "wait"
            }), 200

        # -------------------------------
        # 4. MODEL PREDICTION
        # -------------------------------
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]

        # -------------------------------
        # 🔥 RULE 2: Reduce overconfidence
        # -------------------------------
        if cart == 0:
            probability *= 0.6

        # -------------------------------
        # 🔥 RULE 3: FINAL DECISION ENGINE
        # -------------------------------
        if score < 10:
            action = "give_20_discount"
        elif score < 20:
            action = "show_bundle"
        else:
            action = "no_discount"

        # -------------------------------
        # 🔥 DEBUG LOG (VERY USEFUL)
        # -------------------------------
        print(f"[USER {user_id}] clicks={clicks}, time={time_spent}, cart={cart}, score={score}, prob={probability}")

        # -------------------------------
        # 5. RESPONSE
        # -------------------------------
        return jsonify({
            "prediction": int(prediction),
            "confidence": round(float(probability), 2),
            "action": action
        }), 200

    except Exception as e:
        print("🔥 ERROR:", e)
        return jsonify({"error": str(e)}), 500