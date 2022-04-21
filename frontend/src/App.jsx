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
import Gallery from './components/Gallery'
import Home from './components/Home'
import UserForm from './components/UserForm'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/create_user" element={<UserForm />} />
    </Routes>
  )
}

export default App
