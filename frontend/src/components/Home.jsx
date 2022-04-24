import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Components
import NavBar from './NavBar'
import Schedule from './Schedule'
import UserDetails from './UserDetails'
import ProfileCard from './ProfileCard'

//images
import angry from '../imgs/angrymatcha.gif'
import left from '../imgs/sleepmatcha.gif'
import right from '../imgs/matcha.gif'
import words from '../imgs/words.gif'

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [surveyed, setSurveyed] = useState(true) 
  const [hasMatched, setHasMatched] = useState(false)
  const [matchedPartner, setMatchedPartner] = useState('')
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
    const getUsermatching = async () => {
      await axios.get('/matchedwith').then(response => {
        if (response.status === 200) {
          const data = response.data
          if (data.received_match) {
            setHasMatched(true)
            setMatchedPartner(data.matched_with)
          } else {
            //you didn't receive a matching this week. 
          }
        } else if (response.status === 400) {
          //they didn't have a matching this week (they didn't opt in for a coffee chat)
        } else {
          //there are no current matchings out. 
        }
      })
    }
    const getUserdetails = async () => {
      const {data} = await axios.get('/details')
        .catch(err => {
          if (err.response) {
            console.log(err.response.status)
            if (err.response.status === 406) {
              setCreatedAccount(false)
              //make sure to make them fill out personal information
            }
          }
          //console.log(err)
       })
      if (data) {
        setUserInformation(data)
        setCreatedAccount(true)
      }
      console.log(data)
    }
    getUserdetails()
    getUsermatching()
  }, [])

  // TODO: axios post that chat is completed
  const submitCompletedChat = () => {
    
  }

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
      if (hasMatched) {
        return (
          <>
            <img src={words} className="relative top-16 w-1/2" />
            <div className="flex justify-center mb-10">
              <img src={left} className="w-60 h-60 rounded-3xl" />
              <h2 className='relative top-36 mx-10'>
                {matchedPartner /*make this part of the profile card*/} 
              </h2>
              <img src={right} className="w-60 h-60 rounded-3xl"/>
            </div>
            {<ProfileCard user_matched_with={matchedPartner}/>}
          </>
        )
      }
      return (
        <>
          <h1 className="relative top-6 mt-40 text-5xl drop-shadow capitalize font-semibold text-dark_matcha">
            Wait to be match-d :)
          </h1>
          <div className="flex justify-center mb-10">
            <img src={left} className="w-60 h-60 rounded-3xl" />
            <h2 className='relative top-36 mx-10'>
              Patience!
            </h2>
            <img src={right} className="w-60 h-60 rounded-3xl"/>
          </div>
        </>
      )
    }
  }
  
  return (
    <div className="bg-white text-3xl font-mono">
      <NavBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <Display />
      </div>
      <div className="flex justify-center mb-16">
        <button onClick={e => submitCompletedChat()} className="shadow-sm mb-5 text-3xl text-center px-6 py-4 rounded-2xl bg-dark_matcha font-semibold text-white">
          completed chat
        </button>
      </div>
    </div>
  )
}

export default Home
