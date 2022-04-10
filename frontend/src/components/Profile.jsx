import React, { useState } from 'react'
import NavBar from './NavBar'

const Profile = () => {
  const [user, setuser] = useState('')
  const [pfp, setPfp] = useState('')

  return (
    <>
      <NavBar />
      <div className="py-10">
        <h1 className="text-center text-dark_matcha"> Welcome to the Profile Page! </h1>
      </div>
    </>

  )
}

export default Profile
