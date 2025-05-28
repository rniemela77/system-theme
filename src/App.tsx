import { useState } from 'react'
import './App.css'
import Window from './components/Window'
import BottomBar from './components/BottomBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      backgroundColor: '#2980b9',  // A nice blue background for the "screen"
      minHeight: '100vh',
      position: 'relative',
      padding: '20px'
    }}>
      <Window />
      <BottomBar />
    </div>
  )
}

export default App
