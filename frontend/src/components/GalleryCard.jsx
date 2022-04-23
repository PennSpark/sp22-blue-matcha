import React from 'react'

const GalleryCard = ({ picture, pairName, date, description }) => (
  <div className="flex flex-col justify-center w-5/12 mt-10 mb-20 p-10 px-16 pb-12 bg-matcha shadow-xl rounded-xl lowercase">
    <img src={picture} alt="" className="object-cover self-center w-52 h-52 mb-4 rounded-full shadow-md hover:shadow-lg" />
    <div className='mt-8'>
      <h2 className="text-dark_matcha inline font-bold">
        name:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
        {userRealName}
      </div>
    </div>
    <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-bold">
        about:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
        {userAbout}
      </div>
    </div>
    <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-bold">
        availability:&nbsp;
      </h2>
      <div className="flex flex-col text-dark_greentea">
        {userAvailabilities.map((availability, index) => {
          return (
            <div>
              &gt; {availability}
            </div>
          )
        })}
      </div>
    </div>
    <div className='mt-5'>
      <h2 className="text-dark_matcha inline font-bold">
        preferred locations:&nbsp;
      </h2>
      <div className="text-dark_greentea inline">
        {userPreferredLocations.map((location, index) => {
          return (
            <div>
              &gt; {location}
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

export default GalleryCard