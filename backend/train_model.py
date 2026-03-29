import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# -------------------------------
# 1. Load Dataset
# -------------------------------
DATA_PATH = os.path.join("data", "user_data.csv")

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError("❌ Dataset not found. Check data/user_data.csv")

data = pd.read_csv(DATA_PATH)

print("✅ Dataset Loaded Successfully")
print(data.head())

# -------------------------------
# 2. Prepare Features & Target
# -------------------------------
X = data.drop("purchase", axis=1)
y = data["purchase"]

# -------------------------------
# 3. Train-Test Split
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------
# 4. Train Random Forest Model
# -------------------------------
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)

model.fit(X_train, y_train)

print("✅ Model Training Completed")

# -------------------------------
# 5. Evaluate Model
# -------------------------------
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"\n📊 Model Accuracy: {accuracy:.2f}")
print("\n📄 Classification Report:")
print(classification_report(y_test, y_pred))

# -------------------------------
# 6. Save Model
# -------------------------------
MODEL_PATH = "model.pkl"
joblib.dump(model, MODEL_PATH)

print(f"\n💾 Model saved as {MODEL_PATH}")

# -------------------------------
# 7. Test Sample Prediction
# -------------------------------
# Format: [clicks, time_spent, cart_added, last_login]
sample = pd.DataFrame([[5, 10, 1, 2]],
 columns=["clicks", "time_spent", "cart_added", "last_login"])

prediction = model.predict(sample)[0]
probability = model.predict_proba(sample)[0][1]

print("\n🧪 Sample Prediction Test:")
print(f"Input: {sample}")

if prediction == 1:
    print("🟢 Prediction: User WILL BUY")
else:
    print("🔴 Prediction: User will NOT BUY")

print(f"Confidence Score: {probability:.2f}")