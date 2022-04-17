import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

// Routes
import NavBar from './NavBar'

//images
import angry from '../imgs/angrymatcha.gif'
import left from '../imgs/sleepmatcha.gif'
import right from '../imgs/matcha.gif'
import words from '../imgs/words.gif'

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [surveyed, setSurveyed] = useState(false)
  const [matched, setMatched] = useState('')

  useEffect(() => {
    const getUsername = async () => {
      const { data } = (await axios.get('/username'))
      if (data !== 'Not signed in') {
        setLoggedIn(true)
      }
    }
    getUsername()
  }, [])

  const Display = () => {
    if (!loggedIn) {
      return (
        <div className="flex flex-col justify-center items-center mb-40">
          <img src={angry} className="h-56 w-56 rounded-2xl" />
          <Link to="/login" className="text-2xl">Go login!</Link>
        </div>
      )
    } else if (!surveyed) {
      return (
        <div className="flex flex-col justify-center items-center mb-40">
          <img src={angry} className="h-56 w-56 rounded-2xl" />
          <Link to="/survey" className="text-2xl">Ok..hurry and go take the survey mf!</Link>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col justify-center items-center mb-40">
          <img src={words} className="h-20 w-100"/>
          <div className="flex flex-row justify-center items-center">
            <img src={left} className="h-48 w-48 px-3"/>
            <div className="text-dark_matcha">andruwu jiang</div>
            <img src={right} className="h-48 w-48 px-3"/>
          </div>
        </div>
      )
    }
  }
  
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
