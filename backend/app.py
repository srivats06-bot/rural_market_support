from flask import Flask, request, jsonify
from logic import recommend_best_mandi

app = Flask(__name__)

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    crop = data.get("crop")
    location = data.get("location")
    quantity = data.get("quantity", 1)

    result = recommend_best_mandi(crop, location, quantity)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
