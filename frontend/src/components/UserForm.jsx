import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import NavBar from './NavBar'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import axios from 'axios'

const CURR_YEAR = 2022
const SPARK_ROLES = ['Red Developer', 'Red Designer', 'Blue Developer', 'Blue Designer', 'Blue Instructor', 'Executive Board']

const UserForm = () => {
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [year_of_grad, setYear_of_grad] = useState(CURR_YEAR)
    const [email, setEmail] = useState('')
    const [phone_number, setPhone_number] = useState(0)
    const [gender, setGender] = useState('')
    const [major, setMajor] = useState('')
    const [year_joined_spark, setYear_joined_spark] = useState(0)
    const [spark_role, setSpark_role] = useState('')
    const [users_chatted, setUsers_chatted] = useState([])
    const [users_blocked, setUsers_blocked] = useState([])
    const [all_users, setAll_users] = useState([])
    const [retrieved_users, setRetrieved_users] = useState(false)

    const navigate = useNavigate()
    const submit = async () => {
        await axios.post('/createaccount', { first_name, last_name, year_of_grad, email, phone_number,
        gender, major, year_joined_spark, spark_role, users_chatted, users_blocked })
        .then(() => {
            navigate('/profile')
        })
        .catch(error => {
            alert(error.message)
        })
    }
    useEffect(() => {
        const getUsers = async () => {
            const { data } = (await axios.get('/all_users'))
            data.map(obj => ({ ...obj, blocked: 'false' }))
            setAll_users(data)
            setRetrieved_users(true)
        }
        getUsers()
    }, [])
        
    return (
        <div>
            <NavBar />
            <div className="flex justify-center mt-20 mb-20">
            <div className="grid grid-cols-5 bg-light_matcha w-3/4 h-5/6 p-20 rounded-3xl shadow-lg">
                <div className="col-span-full flex flex-col justify-center items-center">
                <h1 className="text-dark_matcha font-semibold text-6xl font-mono mb-8 mt-8">update info</h1>
                <div className = "grid grid-cols-2 gap-4 ">
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="first_name">first name:</label>
                        <input onChange={e => setFirst_name(e.target.value)} value={first_name} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="first_name" type="text" placeholder="First Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="first_name">last name:</label>
                        <input onChange={e => setLast_name(e.target.value)} value={last_name} className="w-80 shadow border rounded-lg py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="last_name" type="text" placeholder="Last Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="first_name">phone:</label>
                        <input onChange={e => setPhone_number(e.target.value)} value={phone_number} className="w-80 shadow border rounded-lg py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="phone_number" type="number" placeholder="Phone Number" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="first_name">email:</label>
                        <input onChange={e => setEmail(e.target.value)} value={email} className="w-80 shadow border rounded-lg py-4 px-3 mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="email" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="first_name">gender:</label>
                        <Dropdown items={['Female', 'Male', 'Other']} setSelected={setGender} selected={gender} fieldName={'Gender'} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="year_of_grad">graduating year:</label>
                        <Dropdown items={Array.from(new Array(7), (x, i) => i + CURR_YEAR)} setSelected={setYear_of_grad} selected={year_of_grad} fieldName={'Graduating Year'} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="major">major:</label>
                        <input onChange={e => setMajor(e.target.value)} value={major} className="w-80 shadow border rounded-lg py-4 px-3 
                        mt-2 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" id="major" type="major" placeholder="Major" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="spark_role">spark role:</label>
                        <Dropdown items={SPARK_ROLES} setSelected={setSpark_role} selected={spark_role} fieldName={'Spark Role'} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1" for="year_joined_spark">year joined spark:</label>
                        <Dropdown items={Array.from(new Array(4), (x, i) => i - 4 + CURR_YEAR)} setSelected={setYear_joined_spark} selected={year_joined_spark} fieldName={'Year Joined Spark'} />
                    </div>
                </div>
                <div className="mb-10" >
                <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1 mb-5" for="first_name">select people you've chatted:</label>
                    {retrieved_users && <Checkbox all_users={all_users} users_chatted={users_chatted} setUsers_chatted={setUsers_chatted} />}
                </div>
                <div className="mb-10 mt-5">
                <label className="block text-dark_matcha font-semibold font-mono text-2xl mt-1 mb-5" for="first_name">people you do not want to pair with:</label>
                    {retrieved_users && <Checkbox all_users={all_users} users_chatted={users_blocked} setUsers_chatted={setUsers_blocked} />}
                </div>
                <button onClick={e => submit()} type="submit" className="w-60 shadow appearance-none border rounded-lg py-4 px-3 mt-2 text-orange-700 bg-orange-200 text-lg leading-tight">
                    Complete!
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default UserForm
