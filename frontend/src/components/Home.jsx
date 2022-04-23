import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Routes
import NavBar from './NavBar'
import Schedule from './Schedule'
import UserDetails from './UserDetails'

//images
import angry from '../imgs/angrymatcha.gif'
import left from '../imgs/sleepmatcha.gif'
import right from '../imgs/matcha.gif'
import words from '../imgs/words.gif'


const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [surveyed, setSurveyed] = useState(false)
  const [matched, setMatched] = useState('')
  const [createdAccount, setCreatedAccount] = useState(false)
  const [userInformation, setUserInformation] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedIn(true)
    // const getUsername = async () => {
    //   const { data } = (await axios.get('/username'))
    //   if (data !== 'Not signed in') {
    //     setLoggedIn(true)
    //   }
    // }
    // getUsername()
    const getUserdetails = async () => {
      const {data} = (await axios.get('/details')
        .catch(err => {
          if (err.response) {
            console.log(err.response.status)
            if (err.response.status === 406) {
              setCreatedAccount(false)
              //make sure to make them fill out personal information
            }
          }
          //console.log(err)
       }))
      if (data) {
        setUserInformation(data)
        setCreatedAccount(true)
      }
      console.log(data)
    }
    getUserdetails()
    
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
      <div className="flex flex-col justify-center items-center mb-20">
        <div className="text-dark_matcha underline">
          <Display />
          <div>{!createdAccount && <Link to="/create_user" className="text-2xl">also, make account!</Link>}</div>
        </div>
        <div className='mb-20'>{createdAccount && <UserDetails data={userInformation}/>}</div>
        <h1 className="text-4xl font-semibold text-dark_matcha mb-10">
          You matcha-d with
        </h1>
        <div className="flex justify-center">
          <img>

          </img>
          <h2>
            {matched}
          </h2>
          <img>

          </img>
        </div>

        <div className="flex justify-center gap-20">
          <Link to="/create_user">
            <button className="w-full px-6 py-4 rounded-xl shadow-lg bg-matcha text-2xl text-dark_matcha">
              update info
            </button>
          </Link>
          <Link to="/availability">
            <button className="w-full px-6 py-4 rounded-xl shadow-lg bg-matcha text-2xl text-dark_matcha">
              availability
            </button>
          </Link>
          <Link to="/survey">
            <button className="w-full px-6 py-4 rounded-xl shadow-lg bg-matcha text-2xl text-dark_matcha">
              take the survey
            </button>
          </Link>
        </div>
        {/* <div className="w-3/4">< Schedule /></div> */}
      </div>
    </div>
  )
}

export default Home
