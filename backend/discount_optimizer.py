def get_discount(probability):
	if probability > 0.8:
		return 5
	elif probability > 0.5:
		return 10
	return 20