import React, { useState } from 'react'

const Checkbox = ({all_users, users_checked, setUsers_checked}) => {
    const CheckItems = () => all_users.map((u, index) => makeCheck(`${u.first_name} ${u.last_name}`, u.userLogin, users_checked.includes(u.userLogin)))
    const makeCheck = (fullname, username, isChecked) => {
        const [ checked, setCheckedTwo ] = useState(isChecked)
        const handleChange = username => {
            let sel = users_checked
            let find = sel.indexOf(username)
            if (find > -1) {
                sel.splice(find, 1)
            } else {
                sel.push(username)
            }
            //change the checked box 
            setCheckedTwo(!checked)
            setUsers_checked(sel)
        }
        return (
            <div>
            <input className="form-check h-6 w-6 border border-dark_matcha rounded-sm bg-white transition duration-200 checked:bg-dark_matcha checked:border-dark_matcha focus:outline-none mt-1 align-top bg-center bg-contain float-left mr-2 cursor-pointer" 
             type='checkbox' value={username} id={username} checked={checked} onChange={() => handleChange(username)}/>
            <label className="form-check-label inline-block text-dark_matcha text-2xl font-medium font-mono ">{fullname}</label>
            </div>
        )
    }
    return (
        <div className='grid grid-cols-3 gap-4'>
            <CheckItems />
        </div>
    )
}
export default Checkbox
