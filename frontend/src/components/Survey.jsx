import React, { useState } from 'react'
import NavBar from './NavBar'

import axios from 'axios'

// import Triangle from 'react-triangle'

const Survey = () => {
  const [questions, setQuestions] = useState([])

  const Left = () => {
    return <Triangle direction="left" x={0} y={0} size={50} />
  }

  const Right = () => {
    return <Triangle direction="right" x={0} y={0} size={50} />
  }

  return (
    <>
      <NavBar />
      <div className="w-screen h-screen py-10 bg-greentea font-mono text-dark_matcha">
        <div className="flex justify-center">
          <div className="flex flex-row bg-light_matcha w-3/4 h-4/6 p-14 rounded-3xl shadow-lg">
            {/* <Left /> */}
            <div>
              <h1 className="ml-5 mb-10 text-2xl">Question blah blah blah?</h1>
              <div className="flex flex-col">
                <button type="button" className="bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">&gt; a for effort</button>
              </div>
            </div>
            {/* <Right /> */}
          </div>
        </div>
      </div>
    </> 
  )
}

export default Survey
