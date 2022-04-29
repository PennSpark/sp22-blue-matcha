import React from 'react'

const GalleryCardBack = ({ pairName, facts, _id, index, deleteCard }) => (
  <div className="flex flex-col items-center justify-evenly w-full h-[650px] mt-10 p-10 px-8 pb-10 bg-light_greentea drop-shadow-svg_lighter hover:shadow-darker rounded-xl text-2xl lowercase cursor-default">
    <div>
      <h2 className="text-dark_matcha inline font-semibold text-3xl italic capitalize">
        matcha
      </h2>
      <div className="text-dark_greentea text-2xl drop-shadow-sm mt-3">
        {pairName}
      </div>
    </div>
    {/* <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-bold">
        date:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
        {date}
      </div>
    </div> */}
    <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-semibold text-3xl capitalize italic">
        interesting fax
      </h2>
      <div className="flex flex-col text-dark_greentea text-2xl drop-shadow-sm mt-3">
        {facts.map((fact, index) => {
          if (fact !== '') {
            return (
            <div>
              - {fact}
            </div>
            )
          }
        })}
      </div>
    </div>
    <div onClick={e => deleteCard(_id, index)} type="button" className="w-60 self-center shadow appearance-none border rounded-lg py-5 px-6 mt-2 text-light_matcha bg-dark_greentea active:bg-dark_matcha border-dark_matcha border-t-0 border-l-1 border-r-4 border-b-4 text-2xl leading-tight font-medium cursor-pointer">
      Delete
    </div>
  </div>
)

export default GalleryCardBack