import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

// Routes
import Login from './Login'
import Survey from './Survey'
import Profile from './Profile'
import Gallery from './Gallery'
import NavBar from './NavBar'

const Home = () => {
  const placeholder = 0

  return (
    <div className="bg-white text-3xl">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Home
