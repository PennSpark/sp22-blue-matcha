import React from 'react'

import Submit from './Submit'

const Answer = ({type, options, markChoice, selected, onSubmitForm}) => {
  const Choice = ({option, index}) => {
    if (type === 'submit') {
      return (
        <Submit onSubmitForm={onSubmitForm} />
      )
    }

    if (index === selected) {
      return (
        <button onClick={e => markChoice(index)} type="button" autoFocus className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon focus:shadow-md">
          &gt; &nbsp; {option}
        </button>
      )
    } else {
      return (
        <button onClick={e => markChoice(index)} type="button" className="w-full bg-white rounded-xl py-5 px-12 text-left focus:bg-lemon active:shadow-md">
          &gt; &nbsp; {option}
        </button>
      )
    }
  }

  if (options !== undefined) {
    if (type === 'MC') {
      return (
        options.map((option, index) => <Choice option={option} index={index} key={index} />)
      )
    } else if (type === 'submit') {
      return (
        <Choice />
      )
    }
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