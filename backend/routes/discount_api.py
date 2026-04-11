from flask import Blueprint, request, jsonify
from discount_optimizer import get_discount


discount_bp = Blueprint("discount", __name__)


@discount_bp.route("/discount", methods=["POST"])
def discount():
	data = request.json
	probability = data.get("probability", 0)

	discount = get_discount(probability)

	return jsonify({
		"discount": discount,
		"reason": "AI optimized based on abandonment risk"
	})