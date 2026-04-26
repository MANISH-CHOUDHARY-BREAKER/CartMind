import pandas as pd
import os
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# -------------------------------
# 1. LOAD DATA
# -------------------------------
DATA_PATH = os.path.join("data", "user_data.csv")

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError("❌ Dataset not found. Check data/user_data.csv")

data = pd.read_csv(DATA_PATH)

print("✅ Dataset Loaded Successfully")
print(data.head())

# -------------------------------
# 2. FEATURES & TARGET
# -------------------------------
X = data[["clicks", "time_spent", "cart_added", "last_login"]]
y = data["purchase"]

# -------------------------------
# 3. SCALING
# -------------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# -------------------------------
# 4. TRAIN-TEST SPLIT
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# -------------------------------
# 5. MODEL
# -------------------------------
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    random_state=42
)

model.fit(X_train, y_train)

print("✅ Model Training Completed")

# -------------------------------
# 6. EVALUATION
# -------------------------------
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"\n📊 Model Accuracy: {accuracy:.2f}")
print("\n📄 Classification Report:")
print(classification_report(y_test, y_pred))

# -------------------------------
# 7. SAVE MODEL + SCALER
# -------------------------------
joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\n💾 Model saved as model.pkl")
print("💾 Scaler saved as scaler.pkl")

# -------------------------------
# 8. SAMPLE TEST
# -------------------------------
sample = pd.DataFrame(
    [[2, 3, 0, 15]],
    columns=["clicks", "time_spent", "cart_added", "last_login"]
)

sample_scaled = scaler.transform(sample)

prediction = model.predict(sample_scaled)[0]
probability = model.predict_proba(sample_scaled)[0][1]

print("\n🧪 Sample Prediction Test:")
print(f"Input: {sample.values.tolist()}")

if prediction == 1:
    print("🟢 Prediction: User WILL BUY")
else:
    print("🔴 Prediction: User will NOT BUY")

print(f"Confidence Score: {probability:.2f}")