import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import NavBar from './NavBar'
import Matchings from './Matchings'


const Admin = () => {
    const [currMatchings, setCurrMatchings] = useState(null)
    const [receivedMatches, setReceivedMatches] = useState(false)
    const [pendingMatches, setPendingMatches] = useState([])
    const [retrievedPending, setRetrievedPending] = useState(false)
    const [generatedMatches, setGeneratedMatches] = useState(false)
    const [usersOptedIn, setUsersOptedIn] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [onView, setOnView] = useState('Current')

    useEffect(() => {
        const getCurrMatches = async () => {
            await axios.get('/api/allmatches').then(response => {
                if (response.status === 200) {
                    setCurrMatchings(response.data)
                    setReceivedMatches(true)
                }
            })
        }
        const getPendingMatches = async () => {
            await axios.get('/api/pendingmatches').then(response => {
                if (response.status === 200) {
                    setPendingMatches(response.data)
                    setRetrievedPending(true)
                }
            }).catch(
                err => console.log(err)
            )
        }
        const grabAllUsers = async () => {
            let { data }  = (await axios.get('/api/all_users_participating'))
            const participating = []
            data = data.map(obj => ({ ...obj, fullname: `${obj.first_name} ${obj.last_name}` }))
            data.map(o => o.chat_participating && participating.push(o.fullname))
            setAllUsers(data)
            console.log(data)
            setUsersOptedIn(participating)
        }
        getCurrMatches()
        getPendingMatches()
        grabAllUsers()
    }, [])

    const usernameToFullname = (all_users, matchings) => {
        const beforeitems = matchings 
        const getFullName = username => {
            const obj = all_users.find(x => x.userLogin === username)
            return obj.fullname
        }
        return beforeitems.map(obj => {
            if (obj.matched_with) {
                return {...obj, matched_with: getFullName(obj.matched_with), user: getFullName(obj.user)}
            } else {
                return {...obj, user: getFullName(obj.user)}
            }
        })
    }
    const fullnameToUsername = (all_users, matchings) => {
        //console.log(matchings)
        const afteritems = matchings 
        const getUserLogin = full_name => {
            const obj = all_users.find(x => x.fullname === full_name)
            //console.log(full_name)
            return obj.userLogin
        }
        return afteritems.map(obj => {
            if (obj.matched_with) {
                return {...obj, matched_with: getUserLogin(obj.matched_with), user: getUserLogin(obj.user)}
            } else {
                return {...obj, user: getUserLogin(obj.user)}
            }
        })
    }
    const generateMatchings = async () => {
        await axios.post('/api/generatematches').then(response => {
            if (response.status === 200) {
                setPendingMatches(response.data)
                setRetrievedPending(true)
            }
        }).catch(
            err => console.log(err)
        )
    }
    const DisplayMembers = ({all_users}) => {
        const NotChatting =  ({user}) => (
            <div className='bg-red-200 hover:shadow-lg py-3 px-8 w-1/3 rounded-xl mb-3 shadow-md'>{user}</div>
        )
        const IsChatting =  ({user}) => (
            <div className='bg-matcha hover:shadow-lg py-3 px-8 w-1/3 rounded-xl mb-3 shadow-md'>{user}</div>
        )
        return (
            <div className="flex flex-col w-1/3 justify-center items-center p-5 m-20 bg-dark_matcha rounded-3xl drop-shadow-svg_darker">
              <div className="mb-7 text-matcha mt-3 text-3xl">
                All members!
              </div>
                {all_users.map(m => m.chat_participating ? <IsChatting user={`${m.first_name} ${m.last_name}`}/> : <NotChatting user={`${m.first_name} ${m.last_name}`}/>)}
            </div>
        )
    }
    const DisplayMatches = ({fullMatchings, title}) => {
        const matches = fullMatchings
        const [matchings, setMatchings] = useState(allUsers.length > 0 ? usernameToFullname(allUsers, matches.matches_generated): matches.matches_generated)
        const MatchedTrue = ({user, matched_with}) => (
            <div className='flex justify-items-stretch flex-row m-3 gap-5'>
                <div className='bg-white hover:shadow-md py-3 px-8 rounded-xl'>{user}</div>
                <div className='text-dark_matcha text-2xl'> {'---'} </div> 
                <div className='bg-white hover:shadow-md py-3 px-8 rounded-xl'>{matched_with}</div>
            </div>
        )
        const MatchedFalse = ({user}) => (
            <div className='flex justify-items-stretch flex-row m-3 gap-5'>
                <div className='bg-white hover:shadow-md py-3 px-8 rounded-xl'>{user}</div>
                <div className='text-dark_matcha text-2xl'> {'---'} </div> 
            </div>
        )
        return (
            <div className="flex flex-col justify-center items-center p-5 m-20 bg-light_matcha rounded-3xl drop-shadow-svg_lighter">
                <div className="text-dark_matcha text-3xl mt-3 mb-5"> {title} </div>
                {matchings.map(m => m.received_match ? <MatchedTrue user={m.user} matched_with={m.matched_with}/> : <MatchedFalse user={m.user}/> )}
            </div>
        )
    }
    
    const PendingMatches = ({pendingMatches, setPendingMatches}) => { 
        const convertToFull = usernameToFullname(allUsers, pendingMatches.matches_generated)
        console.log(convertToFull)
        const [matches, setMatches] = useState(convertToFull) 
        const [error, setError] = useState('')
        const handleMatches = value => {
            setMatches(value)
            const convertToUsers = fullnameToUsername(allUsers, value)
            const item = pendingMatches
            item.matches_generated = convertToUsers
            console.log(convertToUsers)
            setPendingMatches(item)
            console.log('this is the pending matches updated: ')
            console.log(pendingMatches)
        }
        return (
          <div>
            <Matchings matchings={matches} participating_users={usersOptedIn} setMatchings={handleMatches}/>
            <button onClick={e => pushMatchings(setError)} type="submit" className="shadow appearance-none border rounded-lg py-4 bg-light_matcha text-dark_matcha border-dark_matcha active:bg-dark_greentea border-t-0 border-l-1 border-r-4 border-b-4 px-3 mb-2 mt-6 text-lg leading-tight">
              {'Push Matches'}
            </button>
            <div className="text-white">
              {error}
            </div>
            <button onClick={e => savePendingMatches()} type="submit" className="shadow appearance-none border rounded-lg py-4 bg-light_matcha text-dark_matcha border-dark_matcha active:bg-dark_greentea border-t-0 border-l-1 border-r-4 border-b-4 px-3 mb-2  mt-2 text-lg leading-tight">
              {`Save Pending Matchings`}
            </button>
          </div>
        )
    }
    const savePendingMatches = async () => {
        const dataToPush = pendingMatches 
        await (axios.post('/api/updatepending', dataToPush).catch(error => {
            //console.log(data) //test
            console.log(error) //test
        }))
    }
    const pushMatchings = async setError => {
        const dataToPush = pendingMatches 
        const matches = pendingMatches.matches_generated 
        if (checkPendingMatchValidity(matches)) {
            await (axios.post('/api/push_matches', dataToPush).catch(error => {
                //console.log(data) //test
                console.log(error) //test
            }))
            setError('')
            //window.location.reload(false)
        } else {
            //update error messages 
            setError('invalid matchings!')
        }
    }
    const checkPendingMatchValidity = matchings => {
        //for each person, make sure that the person being matched to has that person mapped back 
        let valid = true
        const isValid = obj => {
            if (obj.received_match) {
                const recipient = matchings.find(element => element.user === obj.matched_with)
                if (recipient.matched_with !== obj.user) {
                    valid = false
                }
            }
        }
        matchings.forEach(e => isValid(e))
        return valid
    }
    const changeView = () => {
        setOnView(onView === 'Current' ? 'Pending' : 'Current')
    }
    return (
      <div className="font-mono">
        <NavBar />
        <div className="flex justify-center items-center text-center bg-table"> 
          <div className="flex-col jusitfy-center items-center"> 
            { receivedMatches ? onView === 'Current' && <DisplayMatches fullMatchings={currMatchings} title={'Current Matchings'}/> : 
              <div className="text-2xl mb-4">
                {'There are no current pairings!'}
              </div>
            }
            { retrievedPending ? onView === 'Pending' && 
              <PendingMatches pendingMatches={pendingMatches} setPendingMatches={setPendingMatches} /> : 
              <div className="text-2xl mb-4 text-white">
                {'Generate pending matches!'}
              </div>
            } 
            <div className='justify-self-center'>
              <button onClick={e => changeView()} type="submit" className="shadow appearance-none border rounded-lg py-4 bg-light_matcha text-dark_matcha border-dark_matcha active:bg-dark_greentea border-t-0 border-l-1 border-r-4 border-b-4 px-3 mt-2 mb-2 text-lg leading-tight">
                {onView === 'Pending' ? `Change to current!` : `Change to pending!`}
              </button>
            </div>
            <div className='justify-self-center'>
              <button onClick={e => generateMatchings()} type="submit" className="shadow appearance-none border rounded-lg py-4 bg-light_matcha text-dark_matcha border-dark_matcha active:bg-dark_greentea border-t-0 border-l-1 border-r-4 border-b-4 px-3 mt-2 mb-2 text-lg leading-tight">
                {`Generate Pending Matchings`}
              </button>
            </div>
          </div>
          { allUsers && <DisplayMembers all_users={allUsers} />}
        </div>
      </div>
  )
}

export default Admin