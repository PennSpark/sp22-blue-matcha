import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserDetails = ({data}) => {
    const [isChatting, setIsChatting] = useState(data.chat_participating)

    const refresh = () => {
        window.location.reload(false)
    }

    const login = async () => {
        await axios.post('/login', { username: email, password })
          .then(() => {
            navigate('/home')
          })
          .catch(error => {
            alert(error.message)
          })
      }

    const changeChatting = async () => {
        await axios.post('/change_participating_status', {status: !data.chat_participating}).then(setIsChatting(!isChatting))
        .catch(err => console.log(err))
    }
    
    return (
        <>
        <div className="grid bg-light_matcha rounded-3xl shadow-lg">
            <div className="py-10">
                <div className="text-center text-dark_matcha mb-20 pl-10 pr-10"> welcome back, {`${data.first_name} ${data.last_name}`} !! </div>
                <div className="text-center text-dark_matcha">
                <Link to="/create_user" className="bg-white hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Update your details</Link>
                </div>
                <div className="text-center text-dark_matcha mb-5 mt-10">
                <button onClick={e => changeChatting()} type='submit' className="bg-white hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">{isChatting ? `Start chatting` : `Stop Chatting`}</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDetails
