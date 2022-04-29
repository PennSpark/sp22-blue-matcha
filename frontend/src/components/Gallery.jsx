import React, { useState, useEffect } from 'react'

// Components
import NavBar from './NavBar'
import GalleryCard from './GalleryCard'
import GalleryModal from './GalleryModal'

import axios from 'axios'

// imgs
import left from '../imgs/sleepmatcha.gif'
import right from '../imgs/matcha.gif'

const DEFAULT = 'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'

const Gallery = () => {
  const [cards, setCards] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [receivedCards, setReceivedCards] = useState(false)

  useEffect(() => {
    const getAllCards = async () => {
      const response = (await axios.get('/api/gallery'))
      console.log(response.status)
      if (response.status === 200) {
        console.log(response.data)
        setReceivedCards(true)
        setCards(response.data)
      }
    }
    getAllCards()
  }, [])

  //   // 
  //   getAllCards()
  //   const intervalID = setInterval(() => {
  //     getAllCards()
  //   }, 2000)

  //   return () => clearInterval(intervalID)
  // }, [])
  
  const GalleryModel = ({ allCards }) => allCards.map(card => {
    const date = new Date(card.date)
    let formatted_date = date.toDateString()
    return (
      <GalleryCard picture={card.photo ? card.photo.image_url : DEFAULT} pairName={card.people} date={card.date ? formatted_date : ''} facts={card.facts} />
    )
  })

  const CardModal = () => {
    if (modalVisible) {
      return <GalleryModal setModalVisible={setModalVisible} />
    }
    return <></>
  }

  // TODO: uncomment dynamic generation, delete hard coded card
  return (
    <>
      <NavBar />
      <div className="bg-table bg-contain bg-repeat w-screen h-screen border-t-8 border-dark_matcha">
        <div className="flex justify-center font-semibold capitalize">
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <img src={left} className="relative right-10 bottom-4 w-60 h-60 rounded-3xl" />
              <h1 className="relative top-16 inline text-5xl mt-10 text-matcha drop-shadow-title font-mono">
                coffee chat gallery
              </h1>
              <button onClick={e => setModalVisible(true)} button="button" className="relative top-28 inline w-10 h-10 ml-5 rounded-xl text-3xl drop-shadow-svg_closer bg-dark_matcha text-matcha">
                <div className="relative bottom-0.5">
                  +
                </div>
              </button>
              <CardModal />
              <img src={right} className="relative left-10 bottom-4 w-60 h-60 rounded-3xl"/>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-3 justify-items-center justify-start gap-10 px-10 pb-10 bg-table">
          {receivedCards && <GalleryModel allCards={cards}/>}
        </div>
      </div>
    </>
  )
}

export default Gallery

