import React from 'react'

const Answer = ({type, options, markChoice}) => {
  console.log(type)
  console.log(options)

  const Choice = ({option, index}) => (
    <button onClick={markChoice(index)} type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon">
      &gt; {option}
    </button>
  )

  if (options !== undefined && type === 'MC') {
    return (
      options.map((option, index) => <Choice option={option} index={index} key={index} />)
    )
  }

  // } else if (type === 'Long') {
  //   return (
  //     <textarea className="form-control w-full h-36 mt-3 shadow border rounded-lg py-2 px-3 text-black text-base leading-tight focus:outline-none focus:shadow-outline focus:border-greentea" id="answer" type="text" />
  //   )
  // } else if (type === 'short') {
  //   return (
  //     <textarea className="form-control w-full h-10 mt-3 shadow border rounded-lg py-2 px-3 text-black text-base leading-tight focus:outline-none focus:shadow-outline focus:border-greentea" id="answer" type="text" />
  //   )
  // }

  return <></>
}

export default Answer