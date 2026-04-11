from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class UserPrediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    clicks = db.Column(db.Integer)
    time_spent = db.Column(db.Integer)
    cart_added = db.Column(db.Integer)
    last_login = db.Column(db.Integer)
    prediction = db.Column(db.Integer)