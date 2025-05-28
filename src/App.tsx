import { useState } from 'react'
import './App.css'
import Window from './components/Window'

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
    </div>
  )
}

export default App
