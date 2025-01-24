import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Start from './pages/Start'
import Anisol from './pages/Anisol'
import { Routes, Route } from'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/anisol" element={<Anisol />} />
      </Routes>
    </div>
  )
}

export default App