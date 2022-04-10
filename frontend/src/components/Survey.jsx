import React, { useState } from 'react'
import NavBar from './NavBar'

import axios from 'axios'

const Survey = () => {
  const [questions, setQuestions] = useState([])

  const Left = () => {

  }

  const Right = () => {
    
  }

  return (
    <>
      <NavBar />
      <div className="w-screen h-screen py-10 bg-greentea font-mono text-dark_matcha">
        <div className="flex justify-center">
          <div className="bg-light_matcha w-3/4 h-4/6 p-14 rounded-3xl shadow-lg">
            <h1 className="ml-5 mb-10 text-2xl">Question blah blah blah?</h1>
            <div className="flex flex-col">
              <button type="button" className="bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">&gt; a for effort</button>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}

export default Survey
