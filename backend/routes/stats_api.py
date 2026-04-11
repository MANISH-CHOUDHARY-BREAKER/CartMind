import csv
from flask import Response

from flask import Blueprint, jsonify
from databases.database import UserPrediction

# Blueprint name MUST be stats_bp
stats_bp = Blueprint("stats", __name__)

@stats_bp.route("/stats", methods=["GET"])
def get_stats():
    total = UserPrediction.query.count()
    buyers = UserPrediction.query.filter_by(prediction=1).count()
    non_buyers = UserPrediction.query.filter_by(prediction=0).count()

    return jsonify({
        "total": total,
        "buyers": buyers,
        "nonBuyers": non_buyers,
        "highRisk": non_buyers
    })
@stats_bp.route("/export", methods=["GET"])
def export_csv():
    rows = UserPrediction.query.all()

    def generate():
        yield "id,clicks,time_spent,cart_added,last_login,prediction\n"
        for row in rows:
            yield f"{row.id},{row.clicks},{row.time_spent},{row.cart_added},{row.last_login},{row.prediction}\n"

    return Response(generate(), mimetype="text/csv")
