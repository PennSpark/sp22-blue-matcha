import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'

import axios from 'axios'

const ProfileCard = ({ user_matched_with }) => {
  const user = user_matched_with
  // TODO: set the states in use effect by axios pulling actual user data based on the username?
  const [userCard, setUserCard] = useState(null)
  const [receivedCard, setReceivedCard] = useState(false)
  const [userRealName, setUserRealName] = useState('')
  const [userPfp, setUserPfp] = useState('https://64.media.tumblr.com/f0d2656c72487c49a86f98a3233aaebc/261af0ebd07e5fd1-8a/s500x750/e7fffcbdb0c21fbcdea53730a364e63fb142cec7.jpg')
  const [userAbout, setUserAbout] = useState('')
  const [userAvailabilities, setUserAvailabilities] = useState(['Tuesday 7pm', 'Thursday 12pm', 'Friday 6pm', 'Saturday 12pm'])
  const [userPreferredLocations, setUserPreferredLocations] = useState([])

  useEffect(() => {
    const getMatched = async () => {
      await axios.post('/profilecard', {username: user}).then(response => {
          console.log(response)
          if (response.status === 200) {
            const userdata = response.data
            setUserCard(userdata)
            setReceivedCard(true)
            setUserRealName(`${userdata.first_name} ${userdata.last_name}`)
            console.log(userRealName)
            setUserPreferredLocations(userdata.activities)
          }
      }).catch(
          err => err.response ? console.log(err.response.message) : console.log(err)
      )
    }
    getMatched()
  }, [])
  // useEffect(() => {
  //   const getProfileInfo = async () => {
  //     const { data } = (await axios.post('/', { username }))
  //     // get the currently loggedinuser
  //     const { username: loggedInUser } = userData
  //     const {
  //       username: currentUser, pfp, about, collections,
  //     } = data
  //     // if the user of the profile is the current loggedin user, go to my profile page
  //     if (loggedInUser === currentUser) {
  //       navigate('/myprofile')
  //     }
  //     if (!pfp) {
  //       setUserPfp(phd)
  //     } else {
  //       setUserPfp(pfp)
  //     }

  //     setUserAbout(about)
  //     if (collections) {
  //       setUserCollection(collections)
  //     }
  //   }

  //   getProfileInfo()
  // }, [])
  const Details = () => (
    <>
      <div className="flex flex-col justify-center w-5/12 mt-10 mb-20 p-10 px-16 pb-12 bg-matcha shadow-xl rounded-xl lowercase">
        <img src={userPfp} alt="" className="object-cover self-center w-52 h-52 mb-4 rounded-full shadow-md hover:shadow-lg" />
        <div className='mt-8'>
          <h2 className="text-dark_matcha inline font-bold">
            name:&nbsp;
          </h2>
          <div className="text-dark_greentea inline">
            {userRealName}
          </div>
        </div>
        <div className='mt-5'>
          <h2 className="text-dark_matcha inline font-bold">
            about:&nbsp;
          </h2>
          <div className="text-dark_greentea inline">
            {userAbout}
          </div>
        </div>
        <div className='mt-5'>
          <h2 className="text-dark_matcha inline font-bold">
            availability:&nbsp;
          </h2>
          <div className="flex flex-col text-dark_greentea">
            {userAvailabilities.map((availability, index) => {
              return (
                <div>
                  &gt; {availability}
                </div>
              )
            })}
          </div>
        </div>
        <div className='mt-5'>
          <h2 className="text-dark_matcha inline font-bold">
            preferred locations:&nbsp;
          </h2>
          <div className="text-dark_greentea inline">
            {userPreferredLocations.map((location, index) => {
              return (
                <div>
                  &gt; {location}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>

  )

  return (
    <>
      {receivedCard && <Details />}
    </>
  )
}

export default ProfileCard