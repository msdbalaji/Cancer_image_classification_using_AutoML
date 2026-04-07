import './Tabs.css'

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <div className="container">
        <div className="tab-buttons">
          <button 
            className={activeTab === 'info' ? 'active' : ''}
            onClick={() => setActiveTab('info')}
          >
            Project Information
          </button>
          <button 
            className={activeTab === 'demo' ? 'active' : ''}
            onClick={() => setActiveTab('demo')}
          >
            Try the Model
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tabs