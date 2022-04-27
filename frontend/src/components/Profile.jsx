import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import toast from 'react-hot-toast'

import coffeecup from '../imgs/coffeecup.gif'
import pfp from '../imgs/pfp.jpg'
import ProfileModal from './ProfileModal'
const pfpPlaceholder = 'http://kmvkf2hvhfn2vj9tl8e6ps7v-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/default-img.png'

const onToast = () => toast.success(`Turned On Coffee Chat Pairing for the Week`, { icon: '🍃', duration: 4000 })
const offToast = () => toast.success(`Turned Off Coffee Chat Pairing for the Week`, { icon: '🍂', duration: 4000 })
const throwError = error => toast.error(`${error.response.data.message}`, { icon: '🥲' })

const Profile = () => {
  const [myPfp, setMyPfp] = useState(pfpPlaceholder)
  const [myName, setMyName] = useState('')
  const [myAbout, setMyAbout] = useState('')
  const [myInfo, setMyInfo] = useState([])
  const [completedChats, setCompletedChats] = useState([])
  const [filledForm, setFilledForm] = useState(false)
  
  const [createdAccount, setCreatedAccount] = useState(false)
  const [userInformation, setUserInformation] = useState(null)
  const [receivedRequest, setReceivedRequest] = useState(false)

  const [isChatting, setIsChatting] = useState(false)
  const [allUsers, setAllUsers] = useState(null) 
  const [receivedUsers, setReceivedUsers] = useState(false)

  const [pfpModalVisible, setPfpModalVisible] = useState(false)

  useEffect(() => {
    const getFilledForm = async () => {
      await axios.get('/user_completed_form').then(response => {
        if (response.status===200) {
          const info = response.data
          console.log(info)
          setFilledForm(info.filled_form)
        }
      })
    }
    const getUsers = async () => {
      await axios.get('/all_users').then(response => {
        if (response.status === 200) {
          setAllUsers(response.data)
          setReceivedUsers(true) 
        }
      })
    }
    const getPfpImage = async () => {
      await axios.get('/profilepicture').then(response => {
        if (response.status === 200) {
          const profileLink = response.data
          setMyPfp(profileLink)
        }
      })
    }
    const getMyDetails = async () => {
      await axios.get('/details').then(response => {
        if (response.status === 200) {
            const userData = response.data
            setCreatedAccount(true)
            setUserInformation(userData)
            setReceivedRequest(true)
            setMyAbout(userData.about)
            setMyName(`${userData.first_name} ${userData.last_name}`)
            setIsChatting(userData.chat_participating)
            setCompletedChats(userData.users_chatted) //this is all user logins. need to deal w later
        } else if (response.status === 406 ) {
          setCreatedAccount(false)
        } 
      })
    }
    getPfpImage()
    getUsers()
    getMyDetails()
    getFilledForm()
  }, [])

  // Upload the about information to backend 
  const updateAbout = async () => {
    const about = myAbout
      await axios.post('updateabout', {about}).then(console.log('success')).catch(error => {
          console.log(error) //test
      })
  }

  // TODO: more axios to get user information

  // TODO: axios to update pfp


  const refresh = () => {
      window.location.reload(false)
  }

  const changeChatting = async () => {
      await axios.post('/change_participating_status', {status: !userInformation.chat_participating})
      .then(() => {
        if (!isChatting) {
          onToast()
        } else {
          offToast()
        }
        setIsChatting(!isChatting)
      })
      .catch(
        err => throwError(err) 
      )
  }

  const changeAbout = event => {
    setMyAbout(event.target.value)
  }

  const PfpModal = () => {
    if (pfpModalVisible) {
      if (myPfp === pfpPlaceholder) {
        return <ProfileModal setModalVisible={setPfpModalVisible} setPfp={setMyPfp} oldImage={myPfp} />
      }
      return <ProfileModal setModalVisible={setPfpModalVisible} setPfp={setMyPfp} oldImage={myPfp} />
    }
    return <></>
  }

  return (
    <div className="flex justify-evenly w-screen h-screen bg-lightchoco">
      <div className="basis-1/3 justify-between flex flex-col ml-20 my-10">
        <div className="basis-1/2 mb-10">
          <h3 className="text-darkchoco drop-shadow text-4xl text-center mb-5">
            about
          </h3>
          <form onSubmit={e => updateAbout()} className="flex flex-col">
            <div className="shadow bg-white rounded-2xl mb-4">
              <label>
                <textarea value={myAbout} onChange={e => changeAbout(e)} className="p-6 w-full h-60 text-2xl rounded-2xl" />
              </label>
            </div>
            <input className="shadow-md mb-5 text-3xl text-center px-10 py-4 rounded-2xl bg-chocolate text-white cursor-pointer" type="submit" value="submit" />
          </form>

          {/* <input className="h-5/6 shadow bg-white rounded-2xl" type="text" value={myAbout} onChange={changeAbout} />
          <button onClick={e => updateAbout()} className="shadow-sm mb-5 text-2xl text-center px-6 py-4 rounded-2xl bg-dark_matcha font-semibold text-white">
            update about
          </button>
          {/* <div className="h-5/6 shadow bg-white rounded-2xl">
            {myAbout}
          </div> */} 
        </div>
        <div className="basis-1/2 mb-10">
          <h3 className="text-darkchoco drop-shadow text-4xl text-center mb-5">
            manage
          </h3>
          <div className="flex flex-col h-5/6 shadow-lg px-10 py-8 bg-white rounded-2xl">
            <Link to="/create_user" className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-chocolate text-white">
              update info
            </Link> 
            <Link to="/availability" className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-chocolate text-white">
              availability
            </Link>
            {
              filledForm ? <div className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-lightchoco text-white">
                survey complete!
              </div> : 
              <Link to="/survey" className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-chocolate text-white">
              take survey
              </Link>
            }
            <button onClick={e => changeChatting()} type='submit' className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-chocolate text-white">
              {isChatting ? `stop chatting` :  `start chatting` }
            </button>
          </div>
        </div>
      </div>

      <div className="basis-1/3 flex justify-center text-center flex-col my-10">
        <button onClick={e => setPfpModalVisible(true)} type="button" className="self-center">
          <img src={myPfp} alt="" className="object-cover w-80 h-80 mb-4 rounded-full shadow-lg hover:shadow-lg" />        
        </button>
        <PfpModal />
        <div className="text-darkchoco text-4xl">
            {myName}
        </div>
        <div>
          {myInfo.map(info => {
            return (
              <div>
                {info}
              </div>
            )
          })}
        </div>
      </div> 

      <div className="basis-1/3 flex flex-col mr-20 my-10">
        <img src={coffeecup} alt="" className="object-cover self-center w-1/2 h-1/2 mb-2 rounded-2xl" />
        <h3 className="text-darkchoco drop-shadow text-4xl text-center mb-5">
          completed chats
        </h3>
        <div className="w-full h-full shadow-lg px-5 py-2 bg-white rounded-2xl text-darkchoco mb-14">
          {completedChats.map(chat => {
            let fullName = chat
            if (receivedUsers) {
              const user = allUsers.find(obj => obj.userLogin === chat)
              fullName = `${user.first_name} ${user.last_name}`
            }
            return (
              <div>
                {fullName}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile