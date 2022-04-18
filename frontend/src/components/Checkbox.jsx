import React, { useState } from 'react'

const Checkbox = ({all_users, users_chatted, setUsers_chatted}) => {
    const handleChange = username => {
        let sel = users_chatted
        let find = sel.indexOf(username)
        if (find > -1) {
            sel.splice(find, 1)
        } else {
            sel.push(username)
        }
        setUsers_chatted(sel)
        console.log(sel)
    }
    const CheckItems = () => all_users.map(u => makeCheck(`${u.first_name} ${u.last_name}`, u.userLogin))
    const makeCheck = (fullname, username) => 
        <div className="form-check">
            <input className="form-check-input h-6 w-6 border border-dark_matcha rounded-sm bg-white transition duration-200 checked:bg-dark_matcha checked:border-dark_matcha focus:outline-none mt-1 align-top bg-center bg-contain float-left mr-2 cursor-pointer" 
            type="checkbox" value={username} id={username} selected={users_chatted.includes(username)} onChange={() => handleChange(username)}/>
            <label className="form-check-label inline-block text-dark_matcha text-2xl font-medium font-mono " for={username}>{fullname}</label>
        </div>
    return (
        <div className='grid grid-cols-3 gap-4'>
            <CheckItems />
        </div>
    )
}
export default Checkbox
