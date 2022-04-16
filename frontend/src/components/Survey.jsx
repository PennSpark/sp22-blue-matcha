import React, { useState } from 'react'
import NavBar from './NavBar'

import axios from 'axios'

const Survey = () => {
  const [questions, setQuestions] = useState([])

  const Left = () => {
    return (
      <button className="mr-10 text-6xl">
        &lt;
      </button>
    )
  }

  const Right = () => {
    return (
      <button className="ml-10 text-6xl">
        &gt;
      </button>
    )
  }

  return (
    <>
      <NavBar />
      <div className="w-screen h-screen py-10 bg-greentea font-mono text-dark_matcha">
        <div className="flex justify-center">
          <Left />
          <div className="bg-light_matcha w-3/4 h-4/6 p-14 rounded-3xl shadow-lg">
            <div>
              <h1 className="ml-5 mb-10 text-2xl">Question blah blah blah?</h1>
              <div className="flex flex-col gap-5">
                <button type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">&gt; a for effort</button>
                <button type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">&gt; bee bee bee</button>
                <button type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">&gt; when in doubt choose c</button>
                <button type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">&gt; d for dinosaur raur raur</button>
              </div>
            </div>
          </div>
          <Right />
        </div>
      </div>
    </> 
  )
}

export default Survey
