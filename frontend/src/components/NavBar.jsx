import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
import axios from 'axios'
 
// logo
import logo from '../imgs/logo-placeholder.gif'
 
const NavBar = ({ loggedIn = true }) => {
  const [user, setUser] = useState('')

  const logout = async () => {
    await axios.post('/log-out')
      .catch(error => {
        alert(`${error.response.data}`)
      })
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      (await axios.get('/account/status'))
    }
  }, [])

  return (
    <>
      <nav className="shadow-sm bg-light_greentea rounded-b-2xl font-mono">
        <div className="flex flex-row justify-between align-center py-4 px-4">
          <div className="basis-1/3 flex-none">
            <img src={logo} alt="" className="justify-self-start w-20 h-20 py-1 ml-3 rounded-full shadow-md hover:shadow-xl bg-light_lemon" />
          </div>
          <ul className="basis-1/3 flex justify-self-center justify-center items-center gap-12 text-dark_matcha text-base font-semibold">
            <li>
              <Link to="/gallery" className="hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Gallery</Link>
            </li>
            <li>
              <Link to="/" className="hover:bg-matcha hover:shadow-md border-x-4 border-dotted border-matcha py-3 px-8 rounded-xl">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Profile</Link>
            </li>
          </ul>
          <div className="basis-1/3 flex-none self-center text-dark_matcha text-xl">
            {loggedIn && (
              <div className="text-right mr-3">
                <span>Hi rajiv! </span>
                <button onClick={e => logout()} type='submit'>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
 
export default NavBar