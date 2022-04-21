import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'

import axios from 'axios'

const ProfileCard = ({ username }) => {
  const [userPfp, setUserPfp] = useState('http://kmvkf2hvhfn2vj9tl8e6ps7v-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/default-img.png')
  const [userAbout, setUserAbout] = useState('hi hello')

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

  return (
    <>
      <div className="flex justify-center mt-32">
        <div className="bg-grey-200">
          <img src={userPfp} alt="" className="object-cover w-52 h-52 rounded-full border-2 border-matcha shadow-md hover:shadow-lg" />
        </div>
      </div>
    </>
  )
}

export default ProfileCard