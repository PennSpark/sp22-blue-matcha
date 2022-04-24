import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import coffeecup from '../imgs/coffeecup.gif'
import pfp from '../imgs/pfp.png'
import ProfileModal from './ProfileModal'
const pfpPlaceholder = 'http://kmvkf2hvhfn2vj9tl8e6ps7v-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/default-img.png'

const Profile = () => {
  const [myPfp, setMyPfp] = useState('')
  const [myName, setMyName] = useState('')
  const [myAbout, setMyAbout] = useState('')
  const [myInfo, setMyInfo] = useState([])
  const [myData, setMyData] = useState('')
  const [completedChats, setCompletedChats] = useState([])
  
  const [createdAccount, setCreatedAccount] = useState(false)
  const [userInformation, setUserInformation] = useState(null)

  const [isChatting, setIsChatting] = useState(false)

  const [pfpModalVisible, setPfpModalVisible] = useState(false)

  useEffect(() => {
    getUserdetails()
  }, [])

  const getUserdetails = async () => {
    const { data } = (await axios.get('/details')
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
      setMyData(data)
      setUserInformation(data)
      setCreatedAccount(true)
      setIsChatting(data.chat_participating)
    }
  }

  // TODO: more axios to get user information

  // TODO: axios to update pfp


  const refresh = () => {
      window.location.reload(false)
  }

  const changeChatting = async () => {
      await axios.post('/change_participating_status', {status: !myData.chat_participating}).then(setIsChatting(!isChatting))
      .catch(err => console.log(err))
  }

  const PfpModal = () => {
    if (pfpModalVisible) {
      if (myPfp === pfpPlaceholder) {
        return <ProfileModal setModalVisible={setPfpModalVisible} setPfp={setMyPFp} oldImage="" />
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
          <div className="h-5/6 shadow bg-white rounded-2xl">
            {myAbout}
          </div>
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
            <Link to="/survey" className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-chocolate text-white">
              take survey
            </Link>
            <button onClick={e => changeChatting()} type='submit' className="shadow-md mb-5 text-3xl text-center px-5 py-4 rounded-2xl bg-chocolate text-white">
              {isChatting ? `start chatting` : `stop chatting`}
            </button>
          </div>
        </div>
      </div>

      <div className="basis-1/3 flex justify-center text-center flex-col my-10">
        <button onClick={e => setPfpModalVisible(true)} type="button" className="self-center">
          <img src={pfp} alt="" className="object-cover w-80 h-80 mb-4 rounded-full shadow-lg hover:shadow-lg" />        
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
            return (
              <div>
                {chat}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile