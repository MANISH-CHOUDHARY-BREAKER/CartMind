import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

# -------------------------------
# LOAD DATA
# -------------------------------
DATA_PATH = os.path.join("data", "user_data.csv")

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError("Dataset not found")

data = pd.read_csv(DATA_PATH)

# -------------------------------
# FEATURES
# -------------------------------
X = data[["clicks", "time_spent", "cart_added", "last_login"]]
y = data["purchase"]

# -------------------------------
# SCALING
# -------------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# -------------------------------
# MODEL
# -------------------------------
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    random_state=42
)

model.fit(X_scaled, y)

# -------------------------------
# SAVE
# -------------------------------
joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model + Scaler saved")