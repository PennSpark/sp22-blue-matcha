import React, { useState, useEffect } from 'react'
import Dropdown from './Dropdown'

const Matchings = ({matchings, participating_users, setMatchings}) => {
    //for each person in participating, populate it with a field 
    const updateMatchings = (user, selected) => {
        //new matchings needs to search for the user & update the selected item as the user 
        const switchMatchedWith = obj => {
            if (obj.user === user) {
                if (selected) {
                    return {...obj, received_match: true, matched_with: selected}
                } else {
                    return {...obj, received_match: false, matched_with: selected}
                }
            } else {
                return obj
            }
        }
        const updatedMatch = matchings.map(obj => switchMatchedWith(obj))
        // let objIndex = updatedMatch.findIndex(obj => obj.user === user)
        // updatedMatch[objIndex].matched_with = selected
        setMatchings(updatedMatch)
    }
    const makeRow = (name, matched_with, participating_users) => {
        //subtract own person from the particpating_users
        const participants = participating_users.filter(item => item !== name)
        const [ selected, setSelected ] = useState(matched_with)
        const setSelectedModified = value => (
            setSelected(value),
            updateMatchings(name, value)
        )
        return (
            <div>
                <div className="text-white text-xl mt-3">{name}</div>
                <Dropdown items={participants} selected={selected} setSelected={setSelectedModified} fieldName={'matched with:'} />
            </div>
        )
    }
    const MakeRows = () => {
        const items = matchings
        console.log(participating_users)
        return (
            items.map((item, index) => makeRow(item.user, item.matched_with, participating_users))
        )
    }
    return (
        <div>
            <MakeRows />
        </div>
    )
}

export default Matchings