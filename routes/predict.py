from flask import Blueprint, request, jsonify
import joblib
import numpy as np

predict_bp = Blueprint("predict", __name__)

reg_model = joblib.load("./models/regression_model.pkl")


@predict_bp.route("/", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            "MedInc",
            "HouseAge",
            "AveRooms",
            "AveBedrms",
            "Population",
            "AveOccup",
            "Latitude",
            "Longitude",
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        X = np.array(
            [
                data["MedInc"],
                data["HouseAge"],
                data["AveRooms"],
                data["AveBedrms"],
                data["Population"],
                data["AveOccup"],
                data["Latitude"],
                data["Longitude"],
            ]
        ).reshape(1, -1)

        y_pred = reg_model.predict(X)[0]

        return jsonify({"success": True, "data": float(y_pred)})

    except Exception as e:
        print("Predict error:", e)
        return jsonify({"error": "Failed to predict"}), 500
