import joblib
from models.event import Event
from databases.database import db

# Load model
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
# DECISION ENGINE
# -------------------------------
def decide_action(prob):
    if prob > 0.85:
        return "no_discount"
    elif prob > 0.6:
        return "show_bundle"
    elif prob > 0.4:
        return "give_20_discount"
    else:
        return "wait"