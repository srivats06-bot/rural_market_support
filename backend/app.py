from flask import Flask, request, jsonify
from logic import recommend_best_mandi
from flask_cors import CORS

app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/recommend", methods=["POST", "OPTIONS"])
def recommend():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        data = request.get_json(force=True)

        crop = data.get("crop", "wheat")
        location = data.get("location", "")
        quantity = int(data.get("quantity", 1))

        result = recommend_best_mandi(crop, location, quantity)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
