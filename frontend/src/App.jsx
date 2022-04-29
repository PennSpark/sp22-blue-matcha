import React from 'react'

import './styles/index.css'
import {
  Routes,
  Route,
} from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

// Routes
import Login from './components/Login'
import Signup from './components/Signup'
import Survey from './components/Survey'
import Gallery from './components/Gallery'
import Schedule from './components/Schedule'
import Home from './components/Home'
import UserForm from './components/UserForm'
import Admin from './components/Admin'
import Profile from './components/Profile'
import Availability from './components/Availability'
import './styles/index.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/create_user" element={<UserForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
      <Toaster
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          className: '',
          style: {
            padding: '20px',
            'font-size': '16px',
            'padding-left': '30px',
            'font-family': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
        }}
      />
    </>

  )
}

export default App
