from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app, origins=["*"])

# Load the model
model = tf.keras.models.load_model('public/model/lung_cancer_nas_model.h5')
print("Model loaded successfully!")

class_names = {
    0: "Colon Adenocarcinoma (Cancerous)",
    1: "Colon Benign (Non-cancerous)", 
    2: "Lung Adenocarcinoma (Cancerous)",
    3: "Lung Benign (Non-cancerous)",
    4: "Lung Squamous Cell Carcinoma (Cancerous)"
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected'}), 400
    
    try:
        # Read and preprocess the image
        image = Image.open(io.BytesIO(file.read()))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        image = image.resize((128, 128))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Make prediction
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]) * 100)
        
        return jsonify({
            'class': int(predicted_class),
            'className': class_names[predicted_class],
            'confidence': round(confidence, 2)
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model_loaded': True})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=port, debug=False)