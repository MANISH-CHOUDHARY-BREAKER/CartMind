from flask import Blueprint, jsonify, Response
from databases.database import UserPrediction
from models.event import Event
from sqlalchemy import func

# -------------------------------
# INIT BLUEPRINT
# -------------------------------
stats_bp = Blueprint("stats", __name__)


# -------------------------------
# 📊 MAIN STATS API
# -------------------------------
@stats_bp.route("/stats", methods=["GET"])
def get_stats():
    try:
        total_predictions = UserPrediction.query.count()

        buyers = UserPrediction.query.filter_by(prediction=1).count()
        non_buyers = UserPrediction.query.filter_by(prediction=0).count()

        # 🔥 Event-based insights
        total_events = Event.query.count()
        total_clicks = Event.query.filter_by(event_type="click").count()
        total_cart = Event.query.filter_by(event_type="add_to_cart").count()

        # 🔥 Avg time spent
        avg_time = db_avg_time_spent()

        return jsonify({
            "total_predictions": total_predictions,
            "buyers": buyers,
            "non_buyers": non_buyers,
            "conversion_rate": round((buyers / total_predictions) * 100, 2) if total_predictions else 0,

            # Event stats
            "total_events": total_events,
            "clicks": total_clicks,
            "cart_events": total_cart,
            "avg_time_spent": avg_time,

            # Business insight
            "high_risk_users": non_buyers
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# 🔥 AVG TIME HELPER
# -------------------------------
def db_avg_time_spent():
    result = (
        UserPrediction.query.with_entities(func.avg(UserPrediction.time_spent))
        .scalar()
    )
    return round(result, 2) if result else 0


# -------------------------------
# 📁 EXPORT CSV
# -------------------------------
@stats_bp.route("/export", methods=["GET"])
def export_csv():
    try:
        rows = UserPrediction.query.all()

        def generate():
            yield "id,clicks,time_spent,cart_added,last_login,prediction\n"
            for row in rows:
                yield f"{row.id},{row.clicks},{row.time_spent},{row.cart_added},{row.last_login},{row.prediction}\n"

        return Response(
            generate(),
            mimetype="text/csv",
            headers={
                "Content-Disposition": "attachment; filename=cartmind_data.csv"
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500