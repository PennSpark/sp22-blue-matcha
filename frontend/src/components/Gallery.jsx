import React, { useState } from 'react'

// Components
import NavBar from './NavBar'
import GalleryCard from './GalleryCard'
import GalleryModal from './GalleryModal'

const Gallery = () => {
  const [cards, setCards] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  
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
      // TODO: automatically extracts info like the pair with the current
      // user and their matched partner
    const {
      
    } = chat
    // TODO: hard-coded right now
      // <GalleryCard picture={} pairName={} date={} facts={} />
  }

  const CardModal = () => {
    if (modalVisible) {
      return <GalleryModal setModalVisible={setModalVisible} />
    }
    return <></>
  }

  // TODO: uncomment dynamic generation, delete hard coded card
  return (
    <div className="bg-greentea w-screen h-screen">
      <div className="flex justify-center font-semibold pt-10 capitalize">
        <h1 className="inline text-5xl text-dark_matcha">
          coffee chat gallery
        </h1>
        <button onClick={e => setModalVisible(true)} button="button" className="relative top-2 inline w-10 h-10 ml-5 rounded-xl text-3xl bg-dark_matcha text-matcha">
          <div className="relative bottom-0.5">
            +
          </div>
        </button>
        <CardModal />
      </div>

      <div className="grid grid-cols-3 gap-10 p-10 bg-greentea">
        <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} facts={['Ethan is cool', 'Andrew is uwu', 'Food was mid', 'Temp is nice']} />
        <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} facts={['Ethan is cool', 'Andrew is uwu', 'Food was mid', 'Temp is nice']} />
        <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} facts={['Ethan is cool', 'Andrew is uwu', 'Food was mid', 'Temp is nice']} />
        <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} facts={['Ethan is cool', 'Andrew is uwu', 'Food was mid', 'Temp is nice']} />
        <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} facts={['Ethan is cool', 'Andrew is uwu', 'Food was mid', 'Temp is nice']} />
        <GalleryCard picture={'https://ca.slack-edge.com/T02BG31SB7H-U02G075615F-93330ae64fe8-512'} pairName={'Andrew and Ethan'} date={'Saturday'} facts={['Ethan is cool', 'Andrew is uwu', 'Food was mid', 'Temp is nice']} />
        {/* {cards && cards.reverse.map(card => generateCardBlock(card))} */}
      </div>
    </div>
  )
}

export default Gallery

