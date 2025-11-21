from flask import Flask, render_template
from flask_cors import CORS

from routes.predict import predict_bp
from routes.clustering import cluster_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(predict_bp, url_prefix="/api/predict")
app.register_blueprint(cluster_bp, url_prefix="/api/cluster")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict-page")
def predict_page():
    return render_template("predict.html")


@app.route("/cluster-page")
def cluster_page():
    return render_template("cluster.html")


if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("WAOW Season 6 - AI Powered Flask App")
    print("=" * 50)
    print("Server:  http://127.0.0.1:5000")
    print("Predict: http://127.0.0.1:5000/api/predict")
    print("Cluster: http://127.0.0.1:5000/api/cluster")
    print("=" * 50 + "\n")
    app.run(debug=True, host="0.0.0.0", port=5000)
    