import React from 'react'
import './styles/index.css'
import Login from './Login'
import Survey from './Survey'
import Profile from './Profile'
import Gallery from './Gallery'

function App() {
  return (
    <div className="App bg-matcha text-3xl w-screen h-screen">
      <Login />
      <Survey />
      <Profile />
      <Gallery />
    </div>
  )
}

export default App
