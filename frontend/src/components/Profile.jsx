import React, { useState } from 'react'

const Profile = () => {
  const [myPfp, setMyPfp] = useState('')
  const [myUsername, setMyUsername] = useState('')
  const [myInfo, setMyInfo] = useState([])

  return (
    <div className="bg-lightchoco w-screen h-screen">
      <div>
        <div className="flex justify-center mb-1">
          <img src={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} alt="" class="shadow rounded-full max-w-full h-auto align-middle border-none scale-75"/>
        </div>
        <div className="flex justify-center text-3xl text-darkchoco inline font-bold">
            Ethan Zhao
        </div>
        <div className="flex justify-center text-xl text-darkchoco inline">
            Freshman
        </div>
        <div className="flex justify-center text-xl text-darkchoco inline">
            Red, Developer
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-end text-3xl text-chocolate font-bold">
            Completed Chats
        </div>
      </div>
    </div>
  )
}

export default Profile

// mt-10 p-10 px-16 pb-12r