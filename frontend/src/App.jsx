import React from 'react'
import Start from './pages/Start'
import Anisol from './pages/Anisol'
import { Routes, Route } from'react-router-dom'
import { SignUp, SignIn } from '@clerk/clerk-react'

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