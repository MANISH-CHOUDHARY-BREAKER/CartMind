PRODUCT_MAP = {
"laptop": ["Wireless Mouse", "Laptop Stand", "Keyboard"],
"phone": ["Phone Cover", "Fast Charger", "Screen Guard"],
"fashion": ["Shoes", "Watch", "Sunglasses"]
}




def recommend_products(category):
	return PRODUCT_MAP.get(category, ["Gift Card", "Trending Product"])