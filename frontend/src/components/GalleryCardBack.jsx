import React from 'react'

const GalleryCardBack = ({ pairName, facts }) => (
  <div className="flex flex-col w-full h-96 mt-10 p-10 px-8 pb-10 bg-light_matcha shadow-lg hover:shadow-2xl rounded-xl text-2xl lowercase">
    <div className='mt-8'>
      <h2 className="text-dark_matcha inline font-bold">
        chat pair:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
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
      <h2 className="text-dark_matcha inline font-bold">
        interesting fax:&nbsp;
      </h2>
      <div className="flex flex-col text-dark_greentea">
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