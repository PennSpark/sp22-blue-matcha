import React from 'react'

const GalleryCard = ({ picture, pairName, date, facts }) => (
  <div className="flex flex-col justify-center mt-10 p-10 px-16 pb-12 bg-light_matcha shadow-xl rounded-3xl text-2xl lowercase">
    <img src={picture} alt="" className="object-cover self-center w-full h-full mb-2 rounded-2xl shadow-md hover:shadow-lg" />
    <div className='mt-8'>
      <h2 className="text-dark_matcha inline font-bold">
        chat pair:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
        {pairName}
      </div>
    </div>
    <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-bold">
        date:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
        {date}
      </div>
    </div>
    <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-bold">
        interesting fax:&nbsp;
      </h2>
      <div className="flex flex-col text-dark_greentea">
        {facts.map((fact, index) => {
          return (
            <div>
              &gt; {fact}
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

export default GalleryCard