from flask import Blueprint, request, jsonify
import joblib
import numpy as np

cluster_bp = Blueprint("cluster", __name__)

scaler_cluster = joblib.load("./models/scaler_cluster.pkl")
cluster_model = joblib.load("./models/cluster_model.pkl")


@cluster_bp.route("/", methods=["POST"])
def cluster():
    try:
        data = request.get_json() or {}

        required_fields = ["Age", "AnnualIncome", "SpendingScore"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        X_raw = np.array(
            [
                float(data["Age"]),
                float(data["AnnualIncome"]),
                float(data["SpendingScore"]),
            ]
        ).reshape(1, -1)

        X_scaled = scaler_cluster.transform(X_raw)
        label = int(cluster_model.predict(X_scaled)[0])

        return jsonify({"success": True, "cluster": label})
    except Exception as e:
        print("Cluster error:", e)
        return jsonify({"error": "Failed to find cluster"}), 500
