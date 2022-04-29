import React, { useState, useEffect }  from 'react'

import axios from 'axios'
const DEFAULT_PROPIC = 'https://64.media.tumblr.com/f0d2656c72487c49a86f98a3233aaebc/261af0ebd07e5fd1-8a/s500x750/e7fffcbdb0c21fbcdea53730a364e63fb142cec7.jpg'

const ProfileCardBack = ({ user_matched_with  }) => {
  const user = user_matched_with
  // TODO: set the states in use effect by axios pulling actual user data based on the username?
  const [userCard, setUserCard] = useState(null)
  const [receivedCard, setReceivedCard] = useState(false)
  const [userRealName, setUserRealName] = useState('')
  const [userPfp, setUserPfp] = useState(DEFAULT_PROPIC)
  const [userAbout, setUserAbout] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userMajor, setUserMajor] = useState('')
  const [userYear, setUserYear] = useState('')
  const [userAvailabilities, setUserAvailabilities] = useState([])
  const [userPreferredLocations, setUserPreferredLocations] = useState([])

  useEffect(() => {
    const getMatched = async () => {
      await axios.post('/api/profilecard', {username: user}).then(response => {
          console.log(response)
          if (response.status === 200) {
            const userdata = response.data
            setUserCard(userdata)
            setReceivedCard(true)
            setUserRealName(`${userdata.first_name} ${userdata.last_name}`)
            setUserAbout(userdata.about)
            setUserPhone(userdata.phone_number)
            setUserMajor(userdata.major)
            setUserYear(userdata.year_of_grad)
            console.log(userRealName)
            setUserPreferredLocations(userdata.activities)
            const propic = userdata.profile_picture
            if (propic) {
              setUserPfp(propic.image_url)
            }
          }
      }).catch(
          err => err.response ? console.log(err.response.message) : console.log(err)
      )
    }
    const getSchedule = async () => {
      await axios.post('/api/paircalendar', {requested_user: user}).then(response => {
        console.log(response)
        if (response.status === 200) {
          const availability = response.data
          setUserAvailabilities(availability)
      }
      }).catch(
          err => err.response ? console.log(err.response.message) : console.log(err)
      )
    }
    getMatched()
    getSchedule()
  }, [])

  return (
    <div className="flex justify-center pt-20 h-screen bg-lightchoco">
      <div className="flex flex-col justify-evenly w-1/2 p-10 px-16 pb-12 bg-matcha drop-shadow-svg_lighter rounded-xl lowercase text-3xl text-center border-4 border-greentea border-dotted">
        {/* <img src={userPfp} alt="" className="object-cover self-center w-52 h-52 mb-4 rounded-full shadow-xl hover:shadow-lg" /> */}
        <div className='mt-8'>
          <h2 className="text-dark_matcha inline font-bold">
            times you both are free:&nbsp;
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
        <div className='mt-8 mb-2'>
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
    </div>
  )
}

export default ProfileCardBack