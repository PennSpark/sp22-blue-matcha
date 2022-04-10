import React, { useState } from 'react'

import { Link } from 'react-router-dom'

// Routes
import NavBar from './NavBar'

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [surveyed, setSurveyed] = useState(false)
  const [matched, setMatched] = useState('')

  const Display = () => {
    if (!loggedIn) {
      return (
        <Link to="/login" className="text-2xl">But go login!</Link>
      )
    } else if (!surveyed) {
      return (
        <Link to="/survey" className="text-2xl">Ok..hurry and go take the survey mf!</Link>
      )
    } else {
      return (
        <div className="text-dark_matcha">You are matched with lol:</div>
      )
    }
  }

  const placeholder = 0

  return (
    <div className="bg-white text-3xl font-mono">
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-dark_matcha underline">
          <Display />
        </div>
      </div>
    </div>
  )
}

export default Home
