from flask import Blueprint, jsonify
from databases.database import UserPrediction

stats_bp = Blueprint("stats", __name__)

@stats_bp.route("/stats", methods=["GET"])
def stats():
    total = UserPrediction.query.count()
    buyers = UserPrediction.query.filter_by(prediction=1).count()
    non_buyers = UserPrediction.query.filter_by(prediction=0).count()

    return jsonify({
        "total": total,
        "buyers": buyers,
        "nonBuyers": non_buyers,
        "highRisk": non_buyers
    })