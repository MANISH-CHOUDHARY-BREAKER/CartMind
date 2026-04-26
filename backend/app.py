import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import make_response

from flask_jwt_extended import JWTManager, create_access_token
import joblib

# DB
from databases.database import db, UserPrediction

# Routes
from routes.stats_api import stats_bp
from routes.event_api import event_bp

# Models
from models.event import Event


import joblib

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")   # 🔥 ADD THIS
# -------------------------------
# INIT APP
# -------------------------------
app = Flask(__name__)

from flask_cors import CORS

CORS(app, origins=[
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app"
])



# -------------------------------
# CONFIG
# -------------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cartmind.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "cartmind_super_secret_key"

jwt = JWTManager(app)
db.init_app(app)

# -------------------------------
# LOAD MODEL
# -------------------------------

# -------------------------------
# CREATE TABLES
# -------------------------------
with app.app_context():
    db.create_all()

# -------------------------------
# REGISTER ROUTES
# -------------------------------
app.register_blueprint(stats_bp)
app.register_blueprint(event_bp, url_prefix="/api")

# -------------------------------
# DECISION ENGINE
# -------------------------------

# -------------------------------
# FEATURE EXTRACTION (🔥 CORE)
# -------------------------------


 # last_login dummy


# -------------------------------
# HEALTH ROUTE
# -------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "🚀 CartMind Backend Running Successfully"
    })


# -------------------------------
# ADMIN LOGIN (JWT)
# -------------------------------
@app.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":
        token = create_access_token(identity="admin")
        return jsonify({"token": token})

    return jsonify({"error": "Invalid credentials"}), 401


# -------------------------------
# 🚨 EVENT-BASED PREDICTION
# -------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        user_id = data.get("user_id", 1)

        # 🔥 USE EVENTS INSTEAD OF FRONTEND DATA
        features = [extract_features(user_id)]
        features_scaled = scaler.transform(features)

        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1]

      


        # Save prediction log (optional)
        new_prediction = UserPrediction(
            clicks=features[0][0],
            time_spent=features[0][1],
            cart_added=features[0][2],
            last_login=features[0][3],
            prediction=int(prediction)
        )

        db.session.add(new_prediction)
        db.session.commit()

        action = decide_action(probability)

        return jsonify({
            "prediction": int(prediction),
            "confidence": round(float(probability), 2),
            "action": action
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# RUN SERVER
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)






