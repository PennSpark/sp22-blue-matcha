import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'

import axios from 'axios'

const Survey = () => {
  const [questions, setQuestions] = useState([{question: 'Your favorite animal?', options: ['dog', 'cat', 'whale', 'fish'], choice : ''},
                                              {question: 'Your faovrite dining hall?', options: ['bruh', 'hill', 'commons', 'kceh'], choice : ''},
                                              {question: 'Your favorite tea?', options: ['tea', 'matcha', 'blacktea', 'bruh'], choice : ''}])
  const [currIndex, setCurrIndex] = useState(0)
  const [currQuestion, setCurrQuestion] = useState()
  const [currOptions, setCurrOptions] = useState([])
  
  useEffect(() => {
    const { question, options } = questions[currIndex]
    setCurrQuestion(question)
    setCurrOptions(options)
  }, [currIndex])

  const getQuestions = async () => {
    await axios.get('/form', {form_number: 1})
    .then(response => {
      setQuestions(response)
    })
    .catch(error => {
      alert(`${error.response.data}`)
    })
  }

  const lastQuestion = () => {
    if (currIndex <= 0) {
      return
    }
    setCurrIndex(currIndex - 1)
    const { question, options } = questions[currIndex]
    setCurrQuestion(question)
    setCurrOptions(options)
  }

  const nextQuestion = () => {
    if (currIndex >= questions.length - 1) {
      return
    }
    setCurrIndex(currIndex + 1)
    const { question, options } = questions[currIndex]
    setCurrQuestion(question)
    setCurrOptions(options)
  }

  const Choice = ({option}) => {
    return (
      <button type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">
        &gt; {option}
      </button>
    )
  }

  const Left = () => {
    return (
      <button onClick={e => lastQuestion()} type="button" className="mr-10 text-6xl">
        &lt;
      </button>
    )
  }

  const Right = () => {
    return (
      <button onClick={e => nextQuestion()} type="button" className="ml-10 text-6xl">
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
              <h1 className="ml-5 mb-10 text-2xl">{currQuestion}</h1>
              <div className="flex flex-col gap-5">
                {currOptions.map((option, index) => <Choice option={option} key={index} />)}
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
