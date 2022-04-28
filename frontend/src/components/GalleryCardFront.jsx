import React from 'react'

const GalleryCardFront = ({ picture, date }) => (
  <div className="flex flex-col justify-center mt-10 pt-8 px-8 pb-10 bg-light_matcha shadow-lg hover:shadow-2xl rounded-xl text-2xl lowercase">
    <img src={picture} alt="" className="object-cover self-center w-full max-h-96 shadow-md border-4 border-matcha border-dashed" />
    <div className="mt-10 text-dark_matcha font-mono">
      {date}
    </div>
  </div>
)

export default GalleryCardFront