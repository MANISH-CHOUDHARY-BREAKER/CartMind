import pandas as pd
import random
import os

# -------------------------------
# CREATE DATA FOLDER IF NOT EXISTS
# -------------------------------
os.makedirs("data", exist_ok=True)

# -------------------------------
# GENERATE DATA
# -------------------------------
data = []

for _ in range(1000):
    clicks = random.randint(0, 12)
    time_spent = random.randint(1, 30)
    cart_added = random.choice([0, 1])
    last_login = random.randint(1, 30)

    # -------------------------------
    # SMART PURCHASE LOGIC
    # -------------------------------
    score = 0

    if clicks > 6:
        score += 1
    if time_spent > 10:
        score += 1
    if cart_added == 1:
        score += 2
    if last_login < 5:
        score += 1

    # Final decision
    if score >= 3:
        purchase = 1
    else:
        purchase = 0

    data.append([
        clicks,
        time_spent,
        cart_added,
        last_login,
        purchase
    ])

# -------------------------------
# CREATE DATAFRAME
# -------------------------------
df = pd.DataFrame(data, columns=[
    "clicks",
    "time_spent",
    "cart_added",
    "last_login",
    "purchase"
])

# -------------------------------
# SAVE CSV
# -------------------------------
file_path = "data/user_data.csv"
df.to_csv(file_path, index=False)

print(f"✅ Dataset generated successfully at: {file_path}")
print(f"📊 Total rows: {len(df)}")
print("\n🔍 Sample data:")
print(df.head())