import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import axios from 'axios'

import pouring_tea from '../imgs/logowords.png'

const successToast = () => toast.success(`Succesfully Logged In, Ready to Serve Your Matcha :P`, { icon: '🍵', duration: 4000 })
const throwError = error => toast.error(`${error.response.data.message}`, { icon: '🥲' })

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getUsername = async () => {
      const { data } = (await axios.get('/username'))
      if (data !== 'Not signed in') {
        navigate('/home')
      }
    }
    getUsername()
  }, [])

  const login = async () => {
    await axios.post('/login', { username: email, password })
      .then(() => {
        successToast()
        navigate('/home')
      })
      .catch(error => {
        throwError(error)
      })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      login()
    }
  }  

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-5 bg-light_matcha w-3/4 h-4/6 p-20 pl-10 rounded-3xl shadow-lg">
          <div className="col-span-2 flex flex-col justify-center items-center">
            <h1 className="text-dark_matcha font-semibold text-7xl font-mono mb-2 mt-8">Welcome!</h1>
            <h2 className="text-greentea text-2xl">
              don&apos;t have an account?
              <Link to="/signup" className="text-2xl text-black inline"> sign up</Link>
            </h2>
            <div className="mb-4">
              <input onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown} value={email} className="w-80 shadow border rounded-xl py-4 px-3 mt-16 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="text" placeholder="Username" />
            </div>
            <div className="mb-4">
              <input onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown} value={password} className="w-80 shadow border rounded-xl py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="password" placeholder="Password" />
            </div>
            <button onClick={e => login()} type='submit' className="w-60 shadow appearance-none border rounded-xl py-4 px-3 mt-2 mb-8 text-orange-700 bg-orange-200 text-lg leading-tight">
              login
            </button>
          </div>
          <img src={pouring_tea} alt="" className="object-cover col-span-3 h-full w-5/6 rounded-2xl ml-20 bg-white shadow-md hover:shadow-xl py-10 px-12" />
        </div>
      </div>
    </div>
  )
}

export default Login
