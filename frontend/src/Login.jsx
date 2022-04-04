import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import pouring_tea from './imgs/content-placeholder.gif'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex justify-center mt-20">
      <div className="flex bg-light_matcha w-3/4 h-4/6 p-20 rounded-3xl shadow-lg">
        <div className="justify-start">
          <h1 className="text-dark_matcha font-semibold text-7xl font-mono">welcome!</h1>
          <h2 className="text-greentea text-2xl inline">don&apos;t have an account?</h2>
          <Link to="/signup" className="text-2xl inline"> sign up</Link>
          <div className="mb-4">
            <input onChange={e => setEmail(e.target.value)} value={email} className="w-80 shadow border rounded-lg py-2 px-3 mt-10 text-greentea text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="text" placeholder="Email" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} value={password} className="w-80 shadow border rounded-lg py-2 px-3 text-greentea text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="text" placeholder="Password" />
          </div>
          <button type="submit" className="w-20 shadow appearance-none border rounded-lg py-2 px-3 text-orange-700 bg-orange-200 text-base leading-tight">
            signin
          </button>
        </div>
        <div className="flex justify-end rounded-2xl ml-20 bg-white">
          <img src={pouring_tea} alt="" className="rounded-lg shadow-md hover:shadow-xl py-10 px-12" />
        </div>
      </div>
    </div>
  )
}

export default Login
