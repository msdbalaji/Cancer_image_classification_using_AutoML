import './ProjectInfo.css'

const ProjectInfo = () => {
  return (
    <div className="project-info">
      <div className="card">
        <h2>AI-Powered Cancer Image Classification System</h2>
        <p className="project-intro">
          This research project demonstrates a cutting-edge approach to automated cancer diagnosis using 
          Artificial Intelligence and Neural Architecture Search. Our system achieves state-of-the-art 
          performance in classifying lung and colon cancer images with 96.3% accuracy.
        </p>
      </div>

      <div className="card">
        <h2>📊 The Challenge: Manual CNN Design Limitations</h2>
        <p>
          Traditional Convolutional Neural Network (CNN) design for medical imaging faces significant challenges:
        </p>
        <ul>
          <li><strong>Expert Dependency:</strong> Requires deep knowledge of neural network architecture</li>
          <li><strong>Time-Consuming:</strong> Manual design and tuning can take weeks or months</li>
          <li><strong>Human Bias:</strong> Designers tend to favor familiar architectures</li>
          <li><strong>Suboptimal Performance:</strong> Manual designs often overfit or underfit the data</li>
          <li><strong>Inconsistency:</strong> Different experts may create vastly different architectures</li>
        </ul>
        <p>
          These limitations become critical in medical applications where accuracy directly impacts patient outcomes.
        </p>
      </div>

      <div className="card">
        <h2>🤖 Our Solution: Automated Machine Learning with NAS</h2>
        <p>
          We implemented <strong>Neural Architecture Search (NAS)</strong> using AutoML to automate the CNN design process:
        </p>
        
        <h3>How Neural Architecture Search Works</h3>
        <div className="process-flow">
          <div className="process-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Define Search Space</h4>
              <p>Establish parameters for layers, filters, kernel sizes, and hyperparameters</p>
            </div>
          </div>
          
          <div className="process-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>Automated Exploration</h4>
              <p>Hyperband algorithm tests thousands of architecture combinations</p>
            </div>
          </div>
          
          <div className="process-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Performance Evaluation</h4>
              <p>Each architecture is trained and evaluated on validation data</p>
            </div>
          </div>
          
          <div className="process-step">
            <span className="step-number">4</span>
            <div className="step-content">
              <h4>Optimal Selection</h4>
              <p>Best-performing architecture is selected automatically</p>
            </div>
          </div>
        </div>

        <h3>Technical Implementation</h3>
        <ul>
          <li><strong>Framework:</strong> TensorFlow with Keras Tuner</li>
          <li><strong>Search Algorithm:</strong> Hyperband optimization</li>
          <li><strong>Search Space:</strong> 1-3 convolutional layers, 32-128 filters, various kernel sizes</li>
          <li><strong>Hyperparameters:</strong> Automated learning rate and dropout optimization</li>
        </ul>
      </div>

      <div className="card">
        <h2>🔬 Dataset: LC25000 Pathology Images</h2>
        <p>
          We trained our model on the comprehensive <strong>LC25000 dataset</strong> containing 25,000 high-quality 
          histopathology images across five distinct classes:
        </p>
        
        <div className="dataset-classes">
          <div className="class-group">
            <h4>Lung Tissue Classes</h4>
            <ul>
              <li><span className="class-name">Lung Benign</span> - Non-cancerous tissue</li>
              <li><span className="class-name">Lung Adenocarcinoma</span> - Cancerous tissue (glandular)</li>
              <li><span className="class-name">Lung Squamous Cell Carcinoma</span> - Cancerous tissue (squamous)</li>
            </ul>
          </div>
          
          <div className="class-group">
            <h4>Colon Tissue Classes</h4>
            <ul>
              <li><span className="class-name">Colon Benign</span> - Non-cancerous tissue</li>
              <li><span className="class-name">Colon Adenocarcinoma</span> - Cancerous tissue</li>
            </ul>
          </div>
        </div>
        
        <p className="dataset-note">
          The dataset was carefully curated by medical experts and provides balanced representation across all classes, 
          ensuring robust model training and evaluation.
        </p>
      </div>

      <div className="card">
        <h2>📈 Experimental Results: NAS vs Manual Design</h2>
        <p>
          Our NAS-optimized model significantly outperformed traditional manually-designed CNNs:
        </p>
        
        <div className="results-comparison">
          <div className="result-card nas-result">
            <h3>NAS-Optimized CNN</h3>
            <div className="metric">96.3% Validation Accuracy</div>
            <div className="metric">0.056 Validation Loss</div>
            <div className="metric">3.4% Generalization Gap</div>
            <div className="metric">Excellent on Complex Cases</div>
          </div>
          
          <div className="result-card manual-result">
            <h3>Manual CNN (VGG-style)</h3>
            <div className="metric">89.6% Validation Accuracy</div>
            <div className="metric">0.24 Validation Loss</div>
            <div className="metric">13.5% Generalization Gap</div>
            <div className="metric">Poor on Complex Cases</div>
          </div>
        </div>
        
        <h3>Key Performance Advantages</h3>
        <ul>
          <li><strong>+7.6% Accuracy:</strong> Significant improvement in classification performance</li>
          <li><strong>-77% Loss Reduction:</strong> Much better learning and generalization</li>
          <li><strong>Reduced Overfitting:</strong> Smaller generalization gap indicates better true learning</li>
          <li><strong>Superior Complex Case Handling:</strong> Particularly effective on challenging diagnostic cases</li>
        </ul>
      </div>

      <div className="card">
        <h2>⚖️ Trade-offs: Performance vs Computation</h2>
        <p>
          While NAS delivers superior performance, it requires additional computational resources:
        </p>
        
        <div className="tradeoff-comparison">
          <div className="tradeoff">
            <h4>NAS Process</h4>
            <p className="time">~5 hours total</p>
            <p>Architecture search + training</p>
            <p className="advantage">Optimal architecture discovery</p>
          </div>
          
          <div className="tradeoff">
            <h4>Manual Training</h4>
            <p className="time">~1 hour</p>
            <p>Training only (fixed architecture)</p>
            <p className="disadvantage">Suboptimal architecture</p>
          </div>
        </div>
        
        <p className="tradeoff-conclusion">
          The additional computation time is justified for medical applications where accuracy improvements 
          directly translate to better patient outcomes and reduced misdiagnosis rates.
        </p>
      </div>

      {/* <div className="card">
        <h2>🔮 Future Research Directions</h2>
        <p>
          This project opens several exciting avenues for future work:
        </p>
        
        <div className="future-directions">
          <div className="direction">
            <h4>Clinical Integration</h4>
            <p>Develop optimized models for hospital deployment with real-time processing</p>
          </div>
          
          <div className="direction">
            <h4>Explainable AI</h4>
            <p>Integrate visualization tools to show which image regions influenced decisions</p>
          </div>
          
          <div className="direction">
            <h4>Multi-Cancer Expansion</h4>
            <p>Apply the NAS approach to other cancer types and medical imaging modalities</p>
          </div>
          
          <div className="direction">
            <h4>Federated Learning</h4>
            <p>Enable training across multiple hospitals while preserving patient privacy</p>
          </div>
        </div>
      </div> */}

      <div className="card">
        <h2>🎯 Conclusion</h2>
        <p className="conclusion">
          This research demonstrates that <strong>Automated Machine Learning</strong> and <strong>Neural Architecture Search </strong> 
          can significantly outperform traditional manual approaches in medical image classification. By eliminating human bias 
          and systematically exploring the architecture space, NAS produces models that are not only more accurate but also 
          more robust and generalizable.
        </p>
        
        <p className="conclusion">
          The 96.3% accuracy achieved by our NAS-optimized model represents a substantial advancement in automated cancer 
          detection, with potential applications in assisting pathologists, reducing diagnostic errors, and improving 
          patient outcomes through earlier and more accurate detection.
        </p>
        
        <div className="impact-statement">
          <h3>Potential Impact</h3>
          <ul>
            <li>Reduced diagnostic errors in cancer detection</li>
            <li>Faster diagnosis through automated screening</li>
            <li>Democratization of expert-level diagnostic capabilities</li>
            <li>Foundation for next-generation medical AI systems</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo