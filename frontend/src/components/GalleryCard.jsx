import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'

import GalleryCardFront from './GalleryCardFront'
import GalleryCardBack from './GalleryCardBack'

const GalleryCard = ({ picture, pairName, date, facts }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const handleClick = e => {
    e.preventDefault()
    setIsFlipped(!isFlipped)
  }  

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName="w-full">
      <button onClick={e => handleClick(e)} type='button' className='w-full'>
        <GalleryCardFront picture={picture} date={date} />
      </button>
        
      <button onClick={e => handleClick(e)} type='button' className='w-full'>
        <GalleryCardBack pairName={pairName} facts={facts} />
      </button>
    </ReactCardFlip>
  )
}

export default GalleryCard