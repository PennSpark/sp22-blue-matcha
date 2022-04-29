import React from 'react'

const GalleryCardFront = ({ picture, date }) => (
  <div className="flex flex-col justify-center mt-10 pt-8 px-8 pb-10 h-[650px] bg-matcha shadow-lg drop-shadow-svg_lighter hover:shadow-darker rounded-xl text-2xl lowercase">
    <img src={picture} alt="" className="object-cover self-center w-full h-[500px] shadow-md border-4 border-dark_greentea" />
    <div className="mt-10 text-dark_matcha drop-shadow-sm font-mono italic">
      {date}
    </div>
  </div>
)

export default GalleryCardFront