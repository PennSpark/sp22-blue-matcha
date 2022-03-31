import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import './styles/index.css'

// routes
import Login from './Login'
import Survey from './Survey'
import Profile from './Profile'
import Gallery from './Gallery'

// images
import logo from './imgs/logo-placeholder.gif'
import ocha from './imgs/content-placeholder.gif'

// react components
import NavBar from './NavBar'

function App() {
  return (
    <div className="container bg-matcha text-3xl w-screen h-screen">
      <NavBar />
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/survey" component={Survey} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </div>
  )
}

export default App
