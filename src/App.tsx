import { useState } from 'react'
import './App.css'
import Window from './components/Window'
import backgroundImage from './assets/background.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative',
      padding: '20px'
    }}>
      <Window />
    </div>
  )
}

export default App
