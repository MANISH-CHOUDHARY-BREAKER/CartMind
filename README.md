# 🧠 CartMind – Smart E-commerce Prediction Engine

![React](https://img.shields.io/badge/Frontend-React-blue)
![Flask](https://img.shields.io/badge/Backend-Flask-green)
![ML](https://img.shields.io/badge/ML-RandomForest-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

CartMind is a full-stack machine learning application that predicts whether a user will purchase a product based on behavior like clicks, time spent, and cart activity.

It also provides smart actions like discounts or bundles to improve conversion rates.

---

## 🚀 Features

* 🧠 Predict user behavior (Will Buy / Will Leave)
* 📊 Real-time confidence score
* 🎯 Smart recommendations (Discount / Bundle / No Action)
* 📈 Admin dashboard with analytics
* 🗂 Event tracking system
* 📥 Export prediction data as CSV
* 🌙 Clean dark UI

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Flask
* SQLAlchemy
* Flask-CORS
* Flask-JWT-Extended

### Machine Learning

* Scikit-learn (RandomForestClassifier)
* Pandas
* Joblib

---

## 📁 Project Structure

```
CartMind/
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── routes/
│   │   ├── event_api.py
│   │   └── stats_api.py
│   ├── models/
│   ├── databases/
│   └── data/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### 📍 Track User Event

```
POST /api/track
```

**Request Body:**

```json
{
  "user_id": 1,
  "event_type": "click",
  "value": 1
}
```

---

### 📍 Predict User Behavior

```
POST /predict
```

**Response:**

```json
{
  "prediction": 1,
  "confidence": 0.85,
  "action": "show_bundle"
}
```

---

### 📍 Get Stats

```
GET /stats
```

---

### 📍 Export Data

```
GET /export
```

---

## 🧠 Machine Learning Model

* Algorithm: Random Forest Classifier
* Features:

  * clicks
  * time_spent
  * cart_added
  * last_login

**Output:**

* `1` → Will Buy
* `0` → Will Not Buy

---

## 🎯 Decision Logic

| Probability | Action            |
| ----------- | ----------------- |
| > 0.8       | No Discount       |
| > 0.5       | Show Bundle       |
| ≤ 0.5       | Give 20% Discount |

---

## 📸 UI Preview

> Add screenshots here after deployment

---

## ⚠️ Common Issues

### ❌ CORS Error

Fix in backend:

```python
CORS(app, resources={r"/*": {"origins": "*"}})
```

---

### ❌ Import Error (React)

Make sure paths are correct:

```js
import ProductPage from "./components/ProductPage";
```

---

### ❌ Model Always Predicts 1

* Dataset is too small or imbalanced
* Retrain model with better data

---

## 🚀 Future Improvements

* 🔐 User authentication system
* 📊 Advanced dashboard with charts
* 🌐 Deployment (Render / Vercel)
* 🤖 Improved ML model
* 🧪 A/B testing

---

## 👨‍💻 Author

**Manish Chaudhary**
IT Engineering Student

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

---
