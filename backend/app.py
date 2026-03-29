from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -------------------------------
# Load Model
# -------------------------------
model = joblib.load("model.pkl")

print("✅ Model Loaded Successfully")

# -------------------------------
# Home Route
# -------------------------------
@app.route("/")
def home():
    return {"message": "CartMind Backend Running 🚀"}

# -------------------------------
# Prediction API
# -------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Extract features
        clicks = data["clicks"]
        time_spent = data["time_spent"]
        cart_added = data["cart_added"]
        last_login = data["last_login"]

        # Convert to DataFrame (IMPORTANT)
        input_data = pd.DataFrame([[clicks, time_spent, cart_added, last_login]],
                                 columns=["clicks", "time_spent", "cart_added", "last_login"])

        # Prediction
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]

        # Action Logic
        if prediction == 1:
            action = "Recommend Product"
        else:
            action = "Show Discount"

        return jsonify({
            "prediction": int(prediction),
            "confidence": float(probability),
            "action": action
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)