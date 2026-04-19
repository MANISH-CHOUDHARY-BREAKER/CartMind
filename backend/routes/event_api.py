
from flask import Blueprint, request, jsonify
from databases.database import db
from models.event import Event

event_bp = Blueprint("event_api", __name__)


@event_bp.route("/track", methods=["POST"])
def track_event():
    data = request.json

    user_id = data.get("user_id", 1)

    # 1️⃣ Store event
    event = Event(
        user_id=user_id,
        event_type=data.get("event_type"),
        value=data.get("value", 1)
    )

    db.session.add(event)
    db.session.commit()

    # 2️⃣ 🔥 Extract features
    from app import extract_features, model, decide_action

    features = [extract_features(user_id)]

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    action = decide_action(probability)

    # 3️⃣ Return smart response
    return jsonify({
        "message": "Event stored",
        "prediction": int(prediction),
        "confidence": round(float(probability), 2),
        "action": action
    }), 200