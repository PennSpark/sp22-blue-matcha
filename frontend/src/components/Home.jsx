import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import ReactCardFlip from 'react-card-flip'
import toast from 'react-hot-toast'

// Components
import NavBar from './NavBar'
import ProfileCard from './ProfileCard'
import ProfileCardFront from './ProfileCardFront'
import ProfileCardBack from './ProfileCardBack'

// svgs
import closed from '../imgs/svg/cardontable.svg'
import table from '../imgs/svg/tabletop.svg'

// images
import angry from '../imgs/angrymatcha.gif'
import words from '../imgs/words.gif'
import words2 from '../imgs/words2.gif'
import cubetea from '../imgs/cubetea.png'
import animatedcup from '../imgs/matchaAnimated.png'

const completedChatToast = () => toast.success(`Thank you for completing the coffee chat! Now tell us about your experience!`, { icon: '🥰', duration: 4000 })
const throwError = error => toast.error(`${error.response.data.message}`, { icon: '🥲' })

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(true)
  const [surveyed, setSurveyed] = useState(true)
  const [hasMatched, setHasMatched] = useState(false)
  const [matchedPartner, setMatchedPartner] = useState('')
  const [createdAccount, setCreatedAccount] = useState(false)
  const [userInformation, setUserInformation] = useState(null)

  const [isFlipped, setIsFlipped] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setLoggedIn(true)
    // const getUsername = async () => {
    //   const { data } = (await axios.get('/api/username'))
    //   if (data !== 'Not signed in') {
    //     setLoggedIn(true)
    //   }
    // }
    // getUsername()
    const getUsermatching = async () => {
      await axios.get('/api/matchedwith').then(response => {
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
      const {data} = await axios.get('/api/details')
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
        const { admin } = data
        if (admin) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
        setCreatedAccount(true)
      }
      console.log(data)
    }
    getUserdetails()
    getUsermatching()
  }, [])

  // TODO: axios post that chat is completed
  const submitCompletedChat = () => {
    completedChatToast()

    // throw error is error ocurred
    // throwError()
  }

  const Board = () => {
    if (!surveyed) {
      return (
        <div className="flex flex-col justify-center items-center mb-40">
          <img src={angry} className="h-56 w-56 rounded-2xl" />
          <Link to="/survey" className="text-2xl">Ok..hurry and go take the survey mf!</Link>
        </div>
      )
    } else if (hasMatched) {
      return (
        <>
          <div className="flex justify-center mb-10">
            <div className="self-end text-center w-1/3 h-60 mt-10 p-20 px-36 text-2xl drop-shadow-xl rounded-xl capitalize font-semibold bg-light_matcha text-dark_matcha">
              <h1 className="relative top-20 italic">
                {`> ${matchedPartner} <` /*make this part of the profile card*/}
              </h1>
            </div>
          </div>
          <img src={words} className="absolute top-[22%] left-[35%] w-[30%]" />
        </>
      )
    }
    return (
      <>
        <div className="flex justify-center mb-10">
          <div className="self-end text-center w-1/3 h-60 mt-10 p-20 px-36 text-2xl drop-shadow-xl rounded-xl capitalize font-semibold bg-light_matcha text-dark_matcha">
            <h1 className="relative top-20 italic">
            </h1>
          </div>
        </div>
        <img src={words2} className="absolute top-[21%] left-[40.5%] w-[19%]" />
      </>
    )
  }

  const Props = () => {
    if (hasMatched) {
      return (
        <>
          <img src={animatedcup} alt="" className="absolute bottom-[38%] left-[18%] object-contain w-[36%] h-[36%]" />
          <img src={cubetea} alt="" className="absolute bottom-[40%] left-[50%] object-contain w-[32%] h-[32%]" />
        </>
      )
    } else {
      return (
        <>
          <img src={closed} alt="" className="absolute bottom-[40%] left-[10%] object-cover w-[35%] h-[30%]" />
        </>
      )
    }
  }

  const handleClick = e => {
    e.preventDefault()
    setIsFlipped(!isFlipped)
  }  

  const UserCard = isFlipped => {
    if (hasMatched) {
      if (!(isFlipped.isFlipped)) {
        return (
          <div className="">
            {<ProfileCardFront user_matched_with={matchedPartner} />}
          </div>
        )
      }
      return (
        <div className="">
          {<ProfileCardBack user_matched_with={matchedPartner} />}
        </div>
      ) 
    }
    return <></>
  }
  
  return (
    <div className="bg-white text-3xl font-mono w-screen h-screen">
      <NavBar />
      <Board />
      <img src={table} alt="" className="absolute top-[45%] object-cover w-[100%] h-[20%]" />
      <Props />
      <div className="absolute top-[65%] bg-lightchoco w-full h-screen">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName="w-full">
          <button onClick={e => handleClick(e)} type='button' className='w-full'>
            <UserCard isFlipped={isFlipped} />
          </button>
          
          <button onClick={e => handleClick(e)} type='button' className='w-full'>
            <UserCard isFlipped={isFlipped} />
          </button>
        </ReactCardFlip> 
        {hasMatched && (
          <div className="flex justify-center pt-20 pb-12 bg-lightchoco">
            <button onClick={e => submitCompletedChat()} className="shadow-sm mb-5 text-3xl text-center px-8 py-6 rounded-2xl bg-dark_greentea border-dark_matcha active:bg-dark_matcha border-t-0 border-l-1 border-r-4 border-b-4 font-regular text-white">
              completed chat
            </button>
          </div>
        )}

      </div>
      
    </div>
  )
}

export default Home
