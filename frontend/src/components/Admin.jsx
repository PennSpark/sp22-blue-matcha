import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import NavBar from './NavBar'

const Admin = () => {
    const [currMatchings, setCurrMatchings] = useState(null)
    const [receivedMatches, setReceivedMatches] = useState(false)
    const [pendingMatchings, setPendingMatches] = useState([])
    const [generatedMatchings, setGeneratedMatchings] = useState(false)
    const [usersOptedIn, setUsersOptedIn] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const getMatches = async () => {
            const { data } = await axios.get('/allmatches')
            setCurrMatchings(data)
            setReceivedMatches(true)
        }
        const grabAllUsers = async () => {
            const { data }  = (await axios.get('/all_users_participating'))
            const participating = []
            data.map(o => o.chat_participating && participating.push(o))
            setAllUsers(data)
            setUsersOptedIn(participating)
        }
        getMatches()
        grabAllUsers()
    }, [])

    const generateMatchings = async () => {
        //push to generate the matchings 
        const matchings = await axios.post('/generatematches')
        .catch(error => {
            console.log(data) //test
            console.log(error) //test
        })
        if (matchings) {
            setGeneratedMatches(true)
            setPendingMatches(matchings)
        }
    }

    const DisplayMembers = ({all_users}) => {
        const NotChatting =  ({user}) => (
            <div className='bg-red-300 hover:shadow-md py-3 px-8 rounded-xl'>{user}</div>
        )
        const IsChatting =  ({user}) => (
            <div className='bg-green-200 hover:shadow-md py-3 px-8 rounded-xl'>{user}</div>
        )
        return (
            <div className="flex flex-col w-1/3 justify-center items-center p-5 m-20 bg-light_matcha rounded-3xl shadow-lg">
                <div className="text-dark_matcha text-2xl mb-5"> all members! </div>
                {all_users.map(m => m.chat_participating ? <IsChatting user={`${m.first_name} ${m.last_name}`}/> : <NotChatting user={`${m.first_name} ${m.last_name}`}/>)}
            </div>
        )
    }

    const DisplayMatches = ({fullMatchings}) => {
        const matches = fullMatchings
        const [matchings, setMatchings] = useState(matches.matches_generated)
        console.log(matchings)
        const MatchedTrue = ({user, matched_with}) => (
            <div className='flex justify-items-stretch flex-row m-3 gap-5'>
                <div className='bg-white hover:shadow-md py-3 px-8 rounded-xl'>{user}</div>
                <div className='text-dark_matcha text-2xl'> {'---'} </div> 
                <div className='bg-white hover:shadow-md py-3 px-8 rounded-xl'>{matched_with}</div>
                {console.log(user)}
            </div>
        )
        const MatchedFalse = ({user}) => (
            <div className='flex justify-items-stretch flex-row m-3 gap-5'>
                <div className='bg-white hover:shadow-md py-3 px-8 rounded-xl'>{user}</div>
                <div className='text-dark_matcha text-2xl'> {'---'} </div> 
            </div>
        )
        return (
            <div className="flex flex-col w-1/3 justify-center items-center p-5 m-20 bg-light_matcha rounded-3xl shadow-lg">
                <div className="text-dark_matcha text-2xl mb-5"> Matchings! </div>
                {matchings.map(m => m.received_match ? <MatchedTrue user={m.user} matched_with={m.matched_with}/> : <MatchedFalse user={m.user}/>)}
            </div>
        )
    }
    const pushMatchings = async () => {
        const dataToPush = pendingMatches 
        dataToPush.currently_on = true
        // schema.validate(data).then(data => console.log(data)).catch(err => console.log(err))
        await (axios.post('push_matches', dataToPush).catch(error => {
            console.log(data) //test
            console.log(error) //test
        }))
    }

    return (
        <div>
            <NavBar />
            <div className="flex flex-justify-center"> 
                { receivedMatches && <DisplayMatches fullMatchings={currMatchings}/>}
                { allUsers && <DisplayMembers all_users={allUsers} />}
            </div>
        </div>
    )
}

export default Admin