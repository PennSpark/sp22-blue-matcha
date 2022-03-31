import React from 'react'
import { Link } from 'react-router-dom'

// logo
import logo from './imgs/logo-placeholder.gif'

const NavBar = () => (
  <nav className="container flex items-center py-4 mt-4 sm:mt-12">
    <div className="py-1">
      <img src={logo} alt="" className="w-20 h-20" />
      <ul className="hidden sm:flex flex-1 justify-end items-center gap-15 text-darkmatcha uppercase text-sm" />
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
    </div>
  </nav>
)

export default NavBar
