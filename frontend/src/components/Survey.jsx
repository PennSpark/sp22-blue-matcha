import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import Answer from './Answer'

import axios from 'axios'

const FORM_NUMBER = 1

const Survey = () => {
  const [initialized, setInitialized] = useState(false)

  const [user, setUser] = useState('')

  const [questions, setQuestions] = useState([])
  const [currIndex, setCurrIndex] = useState(0)
  const [currType, setCurrType] = useState('')
  const [currQuestion, setCurrQuestion] = useState()
  const [currOptions, setCurrOptions] = useState([])
  const [currSelected, setCurrSelected] = useState(-1)

  useEffect(() => {
    const getQuestions = async () => {
      const { data } = (await axios.get(`/form/${FORM_NUMBER}`))
      setQuestions(data)
      const { question, options, type, selected } = data[currIndex]
      setCurrType(type)
      setCurrOptions(options)
      setCurrQuestion(question)
      if (selected) {
        setCurrSelected(selected)
      }
      setInitialized(true)
    }

    const getUsername = async () => {
      const { data } = (await axios.get('/username'))
      if (data !== 'Not signed in') {
        setUser(data)
      }
    }

    getQuestions()
    getUsername()
  }, [])

  useEffect(() => {
    if (initialized) {
      const { question, options, type } = questions[currIndex]
      setCurrType(type)
      setCurrOptions(options)
      setCurrQuestion(question)
    }
  }, [currIndex])

  const onSubmitForm = async () => {
    await axios.post('/form_submit', { username: user, responses: questions, form_number: FORM_NUMBER })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  const markChoice = index => {
    questions[currIndex].selected = index
    setCurrSelected(index)
  }

  const lastQuestion = () => {
    if (currIndex <= 0) {
      return
    }
    const { selected } = questions[currIndex - 1]
    if (currIndex === questions.length - 1) {
      setCurrIndex(currIndex - 1)
    } else {
      setCurrIndex(currIndex - 1)
    }
    if (selected) {
      setCurrSelected(selected)
    } else {
      setCurrSelected(-1)
    }
    const { question, options, type } = questions[currIndex]
    setCurrType(type)
    setCurrOptions(options)
    setCurrQuestion(question)
  }

  const nextQuestion = () => {
    if (currSelected === -1) {
      alert('Select a choice first')
      return
    }
    if (currIndex >= questions.length - 1) {
      setCurrQuestion('Time to Submit :PP')
      setCurrType('submit')
      return
    }
    const { selected } = questions[currIndex + 1]
    if (selected) {
      setCurrSelected(selected)
    } else {
      setCurrSelected(-1)
    }
    setCurrIndex(currIndex + 1)
    const { question, options, type } = questions[currIndex]
    setCurrType(type)
    setCurrOptions(options)
    setCurrQuestion(question)
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

  const AnswerBlock = () => {
    if (initialized) {
      return <Answer type={currType} options={currOptions} markChoice={markChoice} selected={currSelected} onSubmitForm={onSubmitForm}/>
    } else {
      return <></>
    }
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
                <AnswerBlock />
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
