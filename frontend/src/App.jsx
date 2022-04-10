import React from 'react'

import './styles/index.css'
import {
  Routes,
  Route,
} from 'react-router-dom'

// Routes
import Login from './components/Login'
import Signup from './components/Signup'
import Survey from './components/Survey'
import Profile from './components/Profile'
import Gallery from './components/Gallery'
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
