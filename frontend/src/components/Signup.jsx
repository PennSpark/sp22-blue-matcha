import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import axios from 'axios'

import pouring_tea from '../imgs/logowords.png'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const createUser = async () => {
    await axios.post('/sign-up', { username: email, password })
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        alert(`${error.response.data}`)
      })
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="grid grid-cols-5 bg-light_matcha w-3/4 h-4/6 p-20 rounded-3xl shadow-lg">
        <img src={pouring_tea} alt="" className="object-cover col-span-3 h-full w-5/6 rounded-2xl bg-white shadow-md hover:shadow-xl py-10 px-12" />
        <div className="col-span-2 flex flex-col justify-center items-center">
          <h1 className="text-dark_matcha font-semibold text-6xl font-mono mb-2 mt-8">Signup</h1>
          <h2 className="text-greentea text-2xl inline">
            already have an account?
            <Link to="/login" className="text-2xl text-black inline"> login</Link>
          </h2>
          <div className="mb-4">
            <input onChange={e => setUsername(e.target.value)} value={username} className="w-80 shadow border rounded-lg py-4 px-3 mt-16 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="username" type="text" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input onChange={e => setEmail(e.target.value)} value={email} className="w-80 shadow border rounded-lg py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="text" placeholder="Email" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} value={password} className="w-80 shadow border rounded-lg py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="password" placeholder="Password" />
          </div>
          <button onClick={e => createUser()} type="submit" className="w-60 shadow appearance-none border rounded-lg py-4 px-3 mt-2 text-orange-700 bg-orange-200 text-lg leading-tight">
            signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
