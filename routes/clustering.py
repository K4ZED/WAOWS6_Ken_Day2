from flask import Blueprint, request, jsonify
import joblib
import numpy as np

cluster_bp = Blueprint("cluster", __name__)

kmeans = joblib.load("./models/cluster_model.pkl")
scaler = joblib.load("./models/scaler_cluster.pkl")


@cluster_bp.route("/", methods=["POST"])
def cluster():
    try:
        data = request.get_json()

        required_fields = ["Age", "AnnualIncome", "SpendingScore"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        X = np.array(
            [
                data["Age"],
                data["AnnualIncome"],
                data["SpendingScore"],
            ]
        ).reshape(1, -1)

        X_scaled = scaler.transform(X)
        cluster_label = int(kmeans.predict(X_scaled)[0])

        return jsonify({"success": True, "data": cluster_label})

    except Exception as e:
        print("Cluster error:", e)
        return jsonify({"error": "Failed to cluster"}), 500
