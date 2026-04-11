from flask import Blueprint, request, jsonify
from recommendation_engine import recommend_products


recommendation_bp = Blueprint("recommendation", __name__)


@recommendation_bp.route("/recommend", methods=["POST"])
def recommend():
	data = request.json
	category = data.get("category", "general")

	recommendations = recommend_products(category)

	return jsonify({
		"recommended_products": recommendations,
		"strategy": "cross_sell"
	})