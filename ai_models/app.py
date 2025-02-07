from flask import Flask, request, jsonify

app = Flask(__name__)

# ✅ Define the homepage route
@app.route('/')
def home():
    return "Flask API is running! Use /classify to send POST requests."

# Existing classification route
@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()
    if not data or 'task_description' not in data:
        return jsonify({"error": "Invalid request"}), 400

    # Dummy response (replace with your AI logic)
    return jsonify({"task": data["task_description"], "difficulty": 3.5})

if __name__ == '__main__':
    app.run(debug=True)
