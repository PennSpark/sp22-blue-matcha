import React, { useState } from 'react'
import axios from 'axios'

// TODO: file image upload
// TODO: dynamically resizable facts lists for modal
const GalleryModal = ({ setModalVisible }) => {
  const [people, setPeople] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState('')
  const [facts, setFacts] = useState(['', '', '', '', ''])

  // TODO: adds coffee chat card to server, post correct json based on the schema fields
  const addCard = async () => {
    // await axios.post()
    //   .then(res => {
    const formData = new FormData()
    formData.append('image', image)
    const response = await axios.post('/uploadphoto', formData, {})
    .catch(err => console.log(err))
    const submitData = { date, people, facts }
    if (response.status === 200) {
      const photo = response.data
      submitData.photo = photo
    }
    const formID = await axios.post('/uploadchatcard', submitData, {})
      .catch(err => console.log(err))
    setModalVisible(false)
    window.location.reload(false)
  }

  const submit = async e => {
    e.preventDefault()
    addCard()
  }

  const cancel = e => {
    e.preventDefault()
    setModalVisible(false)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      submit(event)
    }
  }

  const updateFactValue = (index, newValue) => {
    setFacts(facts => facts.map((fact, i) => i === index ? newValue : fact))
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-mono">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="w-full text-xl font-semibold">
                Change Your Profile Picture
              </h3>
              <button type="button" onClick={() => setModalVisible(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <div className="mb-2">
                <label className="ml-1">Coffee Chat Picture</label>
                <input onChange={e => setImage(e.target.files[0])} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="file" name='image' type="file" placeholder="upload png or jpg file :)" />
              </div>
              <div className="mb-2">
                <label className="ml-1">Date</label>
                <input onChange={e => setDate(e.target.value)} value={date} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="date" placeholder="Date of your coffee chat" />
              </div>
              <div className="mb-2">
                <label className="ml-1">People</label>
                <input onChange={e => setPeople(e.target.value)} value={people} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="text" placeholder="people ft. in your coffee chat" />
              </div>
              <div className="mb-4">
                <label className="ml-1">Five Interesting Facts</label>
                <input onChange={e => updateFactValue(0, e.target.value)} value={facts[0]} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="text" placeholder="Fact 1" />
                <input onChange={e => updateFactValue(1, e.target.value)} value={facts[1]} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="text" placeholder="Fact 2" />
                <input onChange={e => updateFactValue(2, e.target.value)} value={facts[2]} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="text" placeholder="Fact 3" />
                <input onChange={e => updateFactValue(3, e.target.value)} value={facts[3]} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="text" placeholder="Fact 4" />
                <input onChange={e => updateFactValue(4, e.target.value)} value={facts[4]} onKeyDown={handleKeyDown} className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-base mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-200" id="question" type="text" placeholder="Fact 5" />
              </div>
              <div className="flow-root">
                <button type="submit" onClick={e => submit(e)} className="bg-light_greentea text-white font-normal h-10 py-1 px-4 text-base rounded">
                  Submit
                </button>
                <button type="submit" onClick={e => cancel(e)} className="bg-matcha text-white font-normal h-10 py-1 px-4 ml-5 text-base rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  )
}

export default GalleryModal
