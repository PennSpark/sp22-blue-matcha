import React, { useState } from 'react'

const Checkbox = ({items, item_labels, items_checked, setItems_checked}) => {
    const CheckItems = () => items.map((u, index) => makeCheck(item_labels.at(index), u, items_checked.includes(u)))
    const makeCheck = (item_label, item, isChecked) => {
        const [ checked, setCheckedTwo ] = useState(isChecked)
        const handleChange = item => {
            let sel = items_checked
            let find = sel.indexOf(item)
            if (find > -1) {
                sel.splice(find, 1)
            } else {
                sel.push(item)
            }
            //change the checked box 
            setCheckedTwo(!checked)
            setItems_checked(sel)
        }
        return (
            <div>
            <input className="form-check h-6 w-6 border border-dark_matcha rounded-sm bg-white transition duration-200 checked:bg-dark_matcha checked:border-dark_matcha focus:outline-none mt-1 align-top bg-center bg-contain float-left mr-2 cursor-pointer" 
             type='checkbox' value={item} id={item} checked={checked} onChange={() => handleChange(item)}/>
            <label className="form-check-label  inline-block text-dark_matcha text-2xl font-medium font-mono ">{item_label}</label>
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
