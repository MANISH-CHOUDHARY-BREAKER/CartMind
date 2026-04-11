import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import joblib
import pandas as pd

from databases.database import db, UserPrediction
from routes.stats_api import stats_bp

app = Flask(__name__)
CORS(app)

# -------------------------------
# App + DB + JWT Config
# -------------------------------
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cartmind.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "cartmind_super_secret_key"

jwt = JWTManager(app)
db.init_app(app)

# -------------------------------
# Load ML Model
# -------------------------------
model = joblib.load("model.pkl")

# -------------------------------
# Create Tables + Register Routes
# -------------------------------
with app.app_context():
    db.create_all()

app.register_blueprint(stats_bp)

# -------------------------------
# Health Route
# -------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "🚀 CartMind Backend Running Successfully"
    })

# -------------------------------
# Admin JWT Login
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
# Prediction Route
# -------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        input_data = pd.DataFrame([[
            data["clicks"],
            data["time_spent"],
            data["cart_added"],
            data["last_login"]
        ]], columns=[
            "clicks",
            "time_spent",
            "cart_added",
            "last_login"
        ])

        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        new_prediction = UserPrediction(
            clicks=data["clicks"],
            time_spent=data["time_spent"],
            cart_added=data["cart_added"],
            last_login=data["last_login"],
            prediction=int(prediction)
        )

        db.session.add(new_prediction)
        db.session.commit()

        action = "Recommend Product" if prediction == 1 else "Show Discount Popup"

        return jsonify({
            "prediction": int(prediction),
            "confidence": round(float(probability), 2),
            "action": action
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
