from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
# Enable CORS so the Node.js or React app can communicate with Flask
CORS(app)

# Attempt to load the model on startup
MODEL_PATH = "stress_model.pkl"
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print(f"[{__name__}] Model loaded successfully.")
    else:
        model = None
        print(f"[{__name__}] Warning: {MODEL_PATH} not found. Please place it in the ml_service directory.")
except Exception as e:
    model = None
    print(f"[{__name__}] Error loading model: {e}")

def get_recommendation(data):
    tips = []
    if float(data['studyLoad']) >= 4:
        tips.append("Your workload seems high. Try breaking your tasks into 25-minute Pomodoro blocks to maintain focus without burning out.")
    if float(data['sleep']) <= 2:
        tips.append("Consistent low sleep is impacting you. Try setting a relaxing 10-minute bedtime routine and aim for a consistent sleep hour.")
    if float(data['headaches']) >= 3:
        tips.append("Frequent headaches can be a sign of dehydration or screen strain. Remember the 20-20-20 rule for your eyes.")
    if float(data['academic']) <= 2:
        tips.append("Academic stress is creeping up. Consider reaching out to a mentor, joining a study group, or breaking assignments into smaller pieces.")
    if float(data['extraAct']) <= 1:
        tips.append("Adding a small physical activity, even a 10-minute daily walk, can drastically reduce lingering mental stress.")
        
    return tips

@app.route("/predict", methods=["POST"])
def predict_stress():
    if model is None:
        return jsonify({"error": "Model not loaded. Please ensure stress_model.pkl is placed in ml_service directory."}), 500
        
    try:
        data = request.json
        
        # Ensure we have all required features
        required_features = ['sleep', 'headaches', 'academic', 'studyLoad', 'extraAct']
        missing_features = [f for f in required_features if f not in data]
        
        if missing_features:
            return jsonify({"error": f"Missing required features: {', '.join(missing_features)}"}), 400
            
        # The model expects this exact order: ['Sleep', 'Headaches', 'Academic', 'Study_Load', 'Extra_Act']
        input_data = pd.DataFrame([{
            'Sleep': float(data['sleep']),
            'Headaches': float(data['headaches']),
            'Academic': float(data['academic']),
            'Study_Load': float(data['studyLoad']),
            'Extra_Act': float(data['extraAct'])
        }])
        
        # Make the prediction and cast to native int to avoid JSON serialization errors
        prediction_num = int(model.predict(input_data)[0])
        
        # Get the probability (confidence percentage) of the "Stress" class (assuming class 1 is stress)
        # Using predict_proba if the model supports it (like RandomForest)
        probability = 0
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(input_data)[0]
            # If the model has 2 classes [0, 1], index 1 gives the probability of stress
            probability = float(probs[1] if len(probs) > 1 else probs[0])
            
        # Get actionable recommendations
        recommendations = get_recommendation(data)
        
        return jsonify({
            "status": "success",
            "prediction": prediction_num,
            "risk": "High Risk" if prediction_num == 1 else "Low Risk",
            "confidence": round(probability * 100, 1),
            "suggestions": recommendations
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
