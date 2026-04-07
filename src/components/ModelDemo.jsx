import { useState, useRef, useEffect } from 'react'
import './ModelDemo.css'

const ModelDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const classNames = {
    0: "Colon Adenocarcinoma (Cancerous)",
    1: "Colon Benign (Non-cancerous)",
    2: "Lung Adenocarcinoma (Cancerous)",
    3: "Lung Benign (Non-cancerous)",
    4: "Lung Squamous Cell Carcinoma (Cancerous)"
  }

  const checkServerHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`)
      if (response.ok) {
        const data = await response.json()
        setIsModelLoaded(data.model_loaded)
        return true
      }
    } catch (error) {
      console.error("Server health check failed:", error)
    }
    return false
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file')
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB')
      return
    }

    setSelectedImage(file)
    setPrediction(null)

    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const classifyImage = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Prediction failed')
      }

      const result = await response.json()
      setPrediction(result)
    } catch (error) {
      console.error('Error:', error)
      alert(`Error classifying image: ${error.message}`)
    }
    setIsLoading(false)
  }

  // Check server health on component mount
  useEffect(() => {
    checkServerHealth()
  }, [])

  return (
    <div className="model-demo">
      <div className="card">
        <h2>Try the Cancer Classification Model</h2>
        <p>
          Upload an image of lung or colon tissue to classify it using our NAS-optimized AI model.
        </p>

        <div className="load-model-section">
          <p>Server status: {isModelLoaded ? 
            <span className="status-connected">Connected ✓</span> : 
            <span className="status-disconnected">Disconnected - Please start the Python server</span>}
          </p>
          <button 
            onClick={checkServerHealth} 
            className="btn load-btn"
          >
            Check Server Connection
          </button>
        </div>

        <div className="upload-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
            disabled={!isModelLoaded}
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className="btn upload-btn"
            disabled={!isModelLoaded}
          >
            Select Image
          </button>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button 
                onClick={classifyImage} 
                disabled={isLoading || !isModelLoaded}
                className="btn classify-btn"
              >
                {isLoading ? 'Classifying...' : 'Classify Image'}
              </button>
            </div>
          )}
        </div>

        {prediction && (
          <div className="prediction-result">
            <h3>Classification Result:</h3>
            <div className={`result-card ${prediction.className.includes('Cancerous') ? 'cancerous' : 'benign'}`}>
              <p><strong>Class:</strong> {prediction.className}</p>
              <p><strong>Confidence:</strong> {prediction.confidence}%</p>
            </div>
            {/* <p className="disclaimer">
              Note: This is a research prototype. Always consult with medical professionals for diagnosis.
            </p> */}
          </div>
        )}
      </div>

      <div className="card">
        <h2>How to Use</h2>
        <ol>
          <li>Make sure the Python server is running on port 3001</li>
          <li>Click "Check Server Connection" to verify the connection</li>
          <li>Select an image of lung or colon tissue (JPEG or PNG format)</li>
          <li>Click "Classify Image" to see the AI's prediction</li>
        </ol>
        {/* <p className="note">
          For best results, use images similar to those in the LC25000 dataset with clear tissue structures.
        </p> */}
        
        <div className="server-instructions">
          <h3>Server Setup Instructions:</h3>
          <pre>
            {`# Install required packages
pip install flask flask-cors pillow tensorflow
# Run the server
python app.py`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default ModelDemo