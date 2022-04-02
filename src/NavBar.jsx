import React from 'react'
import { Link } from 'react-router-dom'

// logo
import logo from './imgs/logo-placeholder.gif'

const NavBar = () => (
  <nav className="flex items-center py-4 px-4 shadow-sm bg-light_greentea rounded-b-2xl font-mono">
    <div className="py-1 ml-3">
      <img src={logo} alt="" className="w-20 h-20 rounded-full shadow-md hover:shadow-xl bg-light_lemon" />
    </div>
    <ul className="hidden sm:flex flex-1 justify-center items-center gap-12 pr-10 text-dark_matcha text-base font-semibold">
      <li>
        <Link to="/login" className="hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Login</Link>
      </li>
      <li>
        <Link to="/survey" className="hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Survey</Link>
      </li>
      <li>
        <Link to="/" className="hover:bg-matcha hover:shadow-md border-x-4 border-dotted border-matcha py-3 px-8 rounded-xl">Home</Link>
      </li>
      <li>
        <Link to="/gallery" className="hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Gallery</Link>
      </li>
      <li>
        <Link to="/profile" className="hover:bg-matcha hover:shadow-md py-3 px-8 rounded-xl">Profile</Link>
      </li>
    </ul>
  </nav>
)

export default NavBar
