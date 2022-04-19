import React, { useState } from 'react'

/**
 * options: all the potential things to choose from 
 * @param {*} param0 
 */
const Dropdown = ({items, setSelected, selected, fieldName}) => {
    const [isOpen, setOpen] = useState(false)
    const toggleDropdown = () => setOpen(!isOpen)
    const handleItemClick = id => selected === id ? setSelected(null) : setSelected(id)
    const DropMenu = () => 
            items.map(item => 
            <div className='text-center text-black bg-white py-4 px-3 hover:bg-light_matcha'onClick={e => handleItemClick(item)} id={item}>
            {item}
            </div>)
    return (
        <div>
            <div className='mt-2 text-center text-black bg-white w-80 shadow border rounded-lg py-4 px-3' onClick={toggleDropdown}>
                <div className="inline-flex items-center">
                    {selected ? selected : `Select ${fieldName}`}
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                    </div>
                {isOpen && <div className='mt-2'><DropMenu /></div>}
            </div>
        </div>
    )
}
export default Dropdown
