import React from 'react'

// Components
import NavBar from './NavBar'
import GalleryCard from './GalleryCard'

const Gallery = () => {
  const [cards, setCards] = useState([])
  
  // TODO, get all the previous coffee chat gallery data
  // useEffect(() => {
  //   const getAllCards = async () => {
  //     const { data } = (await axios.post('/'))
  //     setCards(data)
  //   }


  //   // 
  //   getAllCards()
  //   const intervalID = setInterval(() => {
  //     getAllCards()
  //   }, 2000)

  //   return () => clearInterval(intervalID)
  // }, [])

  const generateCardBlock = chat => {
    // TODO: correctly fetch the data of the coffeechat card based on the object's fields
    const {
      
    } = chat
    // TODO: hard-coded right now
      // <GalleryCard picture={} pairName={} date={} description={} />
  }

  // TODO: uncomment dynamic generation, delete hard coded card
  return (
    <>
      <h1 className="inline text-5xl text-dark_matcha">
        coffee chat gallery
      </h1>
      <button className="inline w-6 h-6 bg-dark_matcha text-matcha">
        +
      </button>
      <div className="grid grid-cols-3 gap-10 m-10 bg-light_matcha">
        <div>
          <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} description={'Ethan was a fun guy! Andrew is uwu'} />
          <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} description={'Ethan was a fun guy! Andrew is uwu'} />
          <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} description={'Ethan was a fun guy! Andrew is uwu'} />
          <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} description={'Ethan was a fun guy! Andrew is uwu'} />
          <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} description={'Ethan was a fun guy! Andrew is uwu'} />
          <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} description={'Ethan was a fun guy! Andrew is uwu'} />
          {/* {cards && cards.reverse.map(card => generateCardBlock(card))} */}
        </div>
      </div>
    </>
  )
}

export default Gallery

