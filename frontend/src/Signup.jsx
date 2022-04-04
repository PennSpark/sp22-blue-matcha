import React, { useState } from 'react'

import pouring_tea from './imgs/content-placeholder.gif'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex justify-center mt-20">
      <div className="flex bg-light_matcha w-3/4 h-4/6 p-20 rounded-3xl shadow-lg">
        <div className="flex justify-start rounded-2xl mr-20 bg-white">
          <img src={pouring_tea} alt="" className="rounded-lg shadow-md hover:shadow-xl py-10 px-12" />
        </div>
        <div className="">
          <h1 className="text-dark_matcha font-semibold text-6xl font-mono">get started</h1>
          <div className="mb-4">
            <input onChange={e => setUsername(e.target.value)} value={username} className="w-80 shadow border rounded-lg py-2 px-3 mt-10 text-greentea text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="username" type="text" placeholder="Username" />
          </div>
          <div className="mb-4">
            <input onChange={e => setEmail(e.target.value)} value={email} className="w-80 shadow border rounded-lg py-2 px-3 text-greentea text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="text" placeholder="Email" />
          </div>
          <div className="mb-4">
            <input onChange={e => setPassword(e.target.value)} value={password} className="w-80 shadow border rounded-lg py-2 px-3 text-greentea text-base leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="password" type="text" placeholder="Password" />
          </div>
          <button type="submit" className="w-20 shadow appearance-none border rounded-lg py-2 px-3 text-orange-700 bg-orange-200 text-base leading-tight">
            signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
