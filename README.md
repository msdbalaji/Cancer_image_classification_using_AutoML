# 🎯 Cancer Image Classification using AutoML

![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.13%2B-orange)
![React](https://img.shields.io/badge/React-18%2B-blue)
![Flask](https://img.shields.io/badge/Flask-2.x%2B-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-ready medical AI system that leverages **Automated Machine Learning (AutoML)** and **Neural Architecture Search (NAS)** to automatically design and train highly accurate convolutional neural networks for lung and colon cancer detection — deployed live on Vercel.

🔗 **Live Demo**: [cancer-image-classification-using-a.vercel.app](https://cancer-image-classification-using-a.vercel.app)

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-%EF%B8%8F-architecture)
- [Results](#-results)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Model Details](#-model-details)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

This project demonstrates a modern approach to medical image analysis by combining **Neural Architecture Search (NAS)** with a clean, production-deployed React + Flask stack. The system automatically discovers optimal CNN architectures for classifying five types of lung and colon tissue samples from the LC25000 dataset — eliminating the need for manual neural network engineering.

### 🎯 Key Achievements
- **Automated architecture design** — NAS-driven search over CNN configurations
- **5-class tissue classification** — Covers both lung and colon cancer subtypes
- **Production deployment** — Fully live on Vercel with Flask backend
- **Lightweight inference** — TensorFlow CPU model served via Gunicorn

---

## ✨ Key Features

### 🔬 Advanced AI Capabilities
- **Neural Architecture Search (NAS)**: Automatically explores CNN configurations across multiple hyperparameter dimensions
- **Multi-class Classification**: Detects 5 types of lung and colon tissues simultaneously
- **Real-time Predictions**: Fast inference pipeline with confidence scores per class
- **AutoML Pipeline**: End-to-end automated model building from training to deployment

### 💻 Technical Stack
- **Backend**: Flask REST API with TensorFlow 2.13 (CPU), served via Gunicorn
- **Frontend**: React 18 + Vite with ESLint configuration
- **Deployment**: Vercel (frontend + serverless) with `vercel.json` configuration
- **Image Preprocessing**: PIL-based resize to 128×128, RGB normalization

---

## 🏗️ Architecture

### System Overview
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React.js      │    │   Flask API      │    │   TensorFlow    │
│   Frontend      │◄──►│   Backend        │◄──►│   NAS Model     │
│                 │    │                  │    │                 │
│ - Image Upload  │    │ - /predict       │    │ - .h5 Model     │
│ - Results View  │    │ - /health        │    │ - 128×128 Input │
│ - Confidence    │    │ - Preprocessing  │    │ - 5-class Softmax│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Inference Pipeline
1. **Image Upload**: User submits a tissue image via the React frontend
2. **Preprocessing**: Flask resizes image to 128×128 RGB, normalizes to [0, 1]
3. **Prediction**: NAS-optimized `.h5` model produces class probabilities
4. **Response**: Predicted class label + confidence score returned as JSON
5. **Display**: React renders the result with class name and confidence

---

## 📊 Results

### Class Detection
The model accurately classifies five tissue types from the LC25000 dataset:

| Class | Type |
|-------|------|
| **Colon Adenocarcinoma** | Colon cancer |
| **Colon Benign** | Non-cancerous colon tissue |
| **Lung Adenocarcinoma** | Lung cancer type |
| **Lung Benign** | Non-cancerous lung tissue |
| **Lung Squamous Cell Carcinoma** | Lung cancer type |

### Model Characteristics
- **Input Size**: 128 × 128 × 3 (RGB)
- **Architecture**: NAS-optimized CNN (`5lung_cancer_nas_model.h5`)
- **Framework**: TensorFlow/Keras 2.13 (CPU-optimized)
- **Warmup**: Automatic graph warm-up on first load for faster inference

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 16+
- TensorFlow CPU 2.13

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/msdbalaji/Cancer_image_classification_using_AutoML.git
cd Cancer_image_classification_using_AutoML
```

2. **Backend Setup**
```bash
pip install -r requirements.txt
python app.py
```

3. **Frontend Setup** (New Terminal)
```bash
npm install
npm run dev
```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Production (Gunicorn)
```bash
gunicorn -c gunicorn.conf.py app:app
```

---

## 📁 Project Structure

```
Cancer_image_classification_using_AutoML/
├── Model_Building/              # NAS training scripts and notebooks
├── public/
│   └── model/
│       └── 5lung_cancer_nas_model.h5   # Trained NAS model
├── src/                         # React frontend source
│   └── components/              # UI components (Upload, Results, etc.)
├── app.py                       # Flask API (predict + health endpoints)
├── requirements.txt             # Python dependencies
├── gunicorn.conf.py             # Gunicorn production config
├── index.html                   # HTML entry point
├── package.json                 # Node.js dependencies
├── vite.config.js               # Vite bundler config
├── eslint.config.js             # ESLint configuration
├── vercel.json                  # Vercel deployment config
└── README.md
```

---

## 💻 Usage

### Web Interface
1. Open the [live demo](https://cancer-image-classification-using-a.vercel.app) or run locally
2. Upload a lung or colon tissue image (JPG/PNG)
3. View the predicted tissue class and confidence score

### Model Training
```bash
# Navigate to Model_Building and run NAS training
cd Model_Building
python training_code.py

# This will:
# 1. Define the NAS search space
# 2. Sample and evaluate CNN configurations
# 3. Select the best-performing architecture
# 4. Train final model and save as .h5
```

### API Usage
```bash
# Health check
curl http://localhost:3001/health

# Predict tissue class from image
curl -X POST -F "image=@tissue_sample.jpg" http://localhost:3001/predict
```

---

## 🔧 Model Details

### NAS Search Space
The model was discovered by searching over CNN hyperparameters including:
- Number of convolutional blocks
- Filter sizes and multipliers
- Kernel size patterns
- Batch normalization usage
- Dropout rates (conv and dense layers)
- Dense layer unit configurations
- Learning rate schedules

### Best Model
- **Format**: Keras `.h5` saved model
- **Input**: 128 × 128 × 3 normalized RGB
- **Output**: Softmax over 5 tissue classes
- **Optimizer**: Adam with learning rate scheduling
- **Deployment**: TensorFlow CPU 2.13 via Flask + Gunicorn

---

## 🌐 API Documentation

### `GET /health`
Returns API and model status.

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "model_in_memory": true
}
```

### `POST /predict`
Classifies a submitted tissue image.

**Request:**
```bash
curl -X POST -F "image=@tissue_image.jpg" http://localhost:3001/predict
```

**Response:**
```json
{
  "class": 2,
  "className": "Lung Adenocarcinoma (Cancerous)",
  "confidence": 97.43
}
```

**Error Response:**
```json
{
  "error": "No image provided"
}
```

---

## 🤝 Contributing

Contributions are welcome! Here are some areas for improvement:

- **Model Performance**: Experiment with more NAS algorithms (e.g., DARTS, RL-based NAS)
- **Explainability**: Add Grad-CAM or SHAP visualizations to highlight decision regions
- **Frontend Features**: Add prediction history, batch upload, or comparison views
- **Deployment**: Docker containerization for easier self-hosting

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Reporting Issues
Use the [GitHub issue tracker](https://github.com/msdbalaji/Cancer_image_classification_using_AutoML/issues) for bug reports, feature requests, or documentation improvements.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Citation
If you use this work in your research, please cite:
```bibtex
@software{CancerClassificationAutoML2025,
  author    = {Balaji, Dhanush Saravanan, Veerakumar V, P Pavani Durga},
  title     = {Cancer Image Classification using AutoML},
  year      = {2026},
  publisher = {GitHub},
  url       = {https://github.com/msdbalaji/Cancer_image_classification_using_AutoML}
}
```

---

## ⚠️ Important Disclaimer
n be restored.
Cancer_image_classification_using_AutoML
/
README.md
in
main

Edit

Preview
**Medical Disclaimer**: This tool is intended for research and educational purposes only. It must not be used for actual clinical diagnosis, treatment decisions, or medical advice. Always consult qualified healthcare professionals for any medical concerns.

**Research Use**: The model's performance on the LC25000 dataset does not guarantee real-world clinical accuracy. Proper clinical validation is required before any healthcare application.

---

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/msdbalaji/Cancer_image_classification_using_AutoML/issues)
- **Live App**: [cancer-image-classification-using-a.vercel.app](https://cancer-image-classification-using-a.vercel.app)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

*Advancing medical AI through automated machine learning.*

</div>
