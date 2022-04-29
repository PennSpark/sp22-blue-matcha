import React from 'react'

const GalleryCardBack = ({ pairName, facts }) => (
  <div className="flex flex-col items-center justify-evenly w-full h-[650px] mt-10 p-10 px-8 pb-10 bg-light_matcha shadow-lg hover:shadow-darker rounded-xl text-2xl lowercase">
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
  </div>
)

export default GalleryCardBack