import React from 'react'

// Routes
import NavBar from './NavBar'

const Home = () => {
  const placeholder = 0

  return (
    <div className="bg-white text-3xl font-mono">
      <NavBar />
      <div className="flex justify-center">
        <h1 className='mt-20 text-dark_matcha'>Welcome Home</h1>
      </div>
    </div>
  )
}

export default Home
