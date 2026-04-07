import { useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ProjectInfo from './components/ProjectInfo'
import ModelDemo from './components/ModelDemo'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('info')

  return (
    <div className="app">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        {activeTab === 'info' ? <ProjectInfo /> : <ModelDemo />}
      </div>
    </div>
  )
}

export default App