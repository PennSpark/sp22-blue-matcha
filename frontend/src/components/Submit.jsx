import React from 'react'

import axios from 'axios'

const Submit = ({ onSubmitForm }) => {
  return (
    <button onClick={e => onSubmitForm()} type="button" autoFocus className="w-full bg-white rounded-xl py-20 px-32 font-bold text-3xl shadow-md focus:bg-lemon">
      Submit!
    </button>
  )
}

export default Submit