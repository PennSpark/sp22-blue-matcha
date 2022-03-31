import React from 'react'
import { Link } from 'react-router-dom'

// logo
import logo from './imgs/logo-placeholder.gif'

const NavBar = () => (
  <nav className="container flex items-center py-4 px-4">
    <div className="py-1 ml-3">
      <img src={logo} alt="" className="w -20 h-20" />
    </div>
    <ul className="hidden sm:flex flex-1 justify-center items-center gap-20 pr-10 text-darkmatcha uppercase text-sm font-semibold">
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/survey">Survey</Link>
      </li>
      <li>
        <Link to="/gallery">Gallery</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
)

export default NavBar
