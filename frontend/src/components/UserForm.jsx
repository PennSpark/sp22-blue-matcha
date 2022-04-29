import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

// components
import NavBar from './NavBar'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import ProfileModal from './ProfileModal'

//import * as yup from 'yup';

const CURR_YEAR = 2022
const SPARK_ROLES = ['Red Developer', 'Red Designer', 'Blue Developer', 'Blue Designer', 'Blue Instructor', 'Executive Board']
const ACTIVITIES = ['swipe them in', 'boba & chill', 'get swiped in', 'center city', 'go on walk', 
  'eat out', 'coffee shop', 'ACME / groceries', 'froyo / ice cream', 'shop / thrifting', 'study sesh']

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
    const [activities, setActivities] = useState([])
    const [retrieved_users, setRetrieved_users] = useState(false)
    const [created_account, setCreated_account] = useState(false)

    const [myAbout, setMyAbout] = useState('')

    const navigate = useNavigate()
    const submit = async () => {
        // const schema = yup.object().shape({
        //     first_name: yup.string().required().min(1, 'Please enter a name.'), 
        //     last_name: yup.string().required().min(1, 'Please enter a last name.'), 
        //     year_of_grad: yup.required().min(1, 'Please enter your grad year.'),
        //     email: yup.string().required()
        // })
        const data = { first_name, last_name, year_of_grad, email, phone_number,
            gender, major, year_joined_spark, spark_role, users_chatted, users_blocked, activities }
        // schema.validate(data).then(data => console.log(data)).catch(err => console.log(err))
        await (axios.post(created_account ? '/updateaccount' : '/createaccount', data).catch(error => {
            console.log(data) //test
            console.log(error) //test
        }))
        navigate('/home')
    }

    useEffect(() => {
        // get user profile picture and call setUserPfp()
        const getUsers = async () => {
            const { data } = (await axios.get('/all_users'))
            data.map(obj => ({ ...obj, blocked: 'false' }))
            setAll_users(data)
            setRetrieved_users(true)
        }
        const getUserdetails = async () => {
            const { data } = (await axios.get('/details')
            .catch(err => console.log(err)))
            if (data) {
              setFirst_name(data.first_name)
              setLast_name(data.last_name)
              setYear_of_grad(data.year_of_grad)
              setEmail(data.email)
              setPhone_number(data.phone_number)
              setGender(data.gender)
              setMajor(data.major)
              setSpark_role(data.spark_role)
              setYear_joined_spark(data.year_joined_spark)
              setUsers_chatted(data.users_chatted)
              setUsers_blocked(data.users_blocked)
              setCreated_account(true)
              setActivities(data.activities)
              setMyAbout(data.about)
            }
          }
        getUsers()
        getUserdetails()
    }, [])

    const changeAbout = event => {
      setMyAbout(event.target.value)
    }
  
    // Upload the about information to backend 
    const updateAbout = async () => {
      const about = myAbout
        await axios.post('updateabout', {about}).then(console.log('success')).catch(error => {
            console.log(error) //test
        })
    }

    const RenderShortAnswer = ({value, setValue, placeholder, label}) => (
      <div className="mb-4">
        <label className="block text-dark_matcha text-2xl mt-1"> {label} </label>
        <input onChange={e => setValue(e.target.value)} value={value} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={placeholder} />
      </div>
    )

    const RenderDropdown = ({items, value, setValue, placeholder, label}) => (
      <div className="mb-4">
        <label className="block text-dark_matcha text-2xl mt-1"> {label} </label>
        <Dropdown items={items} setSelected={setValue} selected={value} fieldName={placeholder} />
      </div>
    )

    const RenderCheckbox = ({items, item_labels, items_checked, setItems_checked, label}) => (
      <div className="mb-10" >
        <label className="block text-dark_matcha text-2xl py-8 border-t-4 border-double border-dark_greentea">{label}</label>
        {retrieved_users && <Checkbox items={items} item_labels={item_labels} items_checked={items_checked} setItems_checked={setItems_checked} />}
      </div>
    )

    const RenderUserCheckboxes = ({all_users, users_selected, setUsers_selected, label}) => {
      const userLogins = []
      const labels = []
      all_users.map(u => {
        userLogins.push(u.userLogin)
        labels.push(`${u.first_name} ${u.last_name}`)
      })
      return (
        <div className="mb-10" >
          <label className="block text-dark_matcha text-2xl py-8 border-t-4 border-double border-dark_greentea">{label}</label>
          {retrieved_users && <Checkbox items={userLogins} item_labels={labels} items_checked={users_selected} setItems_checked={setUsers_selected}/>}
        </div>
      )
    }
  
    return (
      <div className="font-mono bg-light_greentea w-screen">
        <h1 className="text-dark_matcha font-semibold text-6xl text-center pt-20 drop-shadow hover:text-dark_greentea">
          &gt; Update Your User Info &lt;
        </h1>
        <div className="flex justify-center mt-4 font-mono">
          <div className="grid grid-cols-7">
            <div className="col-span-3 bg-light_matcha m-10 p-16 rounded-3xl shadow-xl">
              <div className="col-span-full flex flex-col justify-center place-items-center">
                <div className = "grid grid-cols-2 font-medium gap-x-12 mb-12">
                  <div className="mb-4">
                    <label className="block text-dark_matcha text-2xl mt-1"> {'first name:'} </label>
                    <input onChange={e => setFirst_name(e.target.value)} value={first_name} className="w-full mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'first name'} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-dark_matcha text-2xl mt-1"> {'last name:'} </label>
                    <input onChange={e => setLast_name(e.target.value)} value={last_name} className="w-full mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'last name'} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-dark_matcha text-2xl mt-1"> {'phone number:'} </label>
                    <input onChange={e => setPhone_number(e.target.value)} value={phone_number} className="w-full mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'phone number'} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-dark_matcha text-2xl mt-1"> {'email:'} </label>
                    <input onChange={e => setEmail(e.target.value)} value={email} className="w-full mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'email'} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-dark_matcha  text-2xl mt-1"> {'major:'} </label>
                    <input onChange={e => setMajor(e.target.value)} value={major} className="w-full mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'major'} />
                  </div>
                  <RenderDropdown items={['Female', 'Male', 'Other']} value={gender} setValue={setGender} placeholder={'Gender'} label={'gender:'} />
                  <RenderDropdown items={Array.from(new Array(7), (x, i) => i + CURR_YEAR)} value={year_of_grad} setValue={setYear_of_grad} placeholder={'Grad Year'} label={'graduating year:'} />
                  <RenderDropdown items={SPARK_ROLES} value={spark_role} setValue={setSpark_role} placeholder={'Spark Role'} label={'spark role:'} />
                  <RenderDropdown items={Array.from(new Array(5), (x, i) => i - 4 + CURR_YEAR)} value={year_joined_spark} setValue={setYear_joined_spark} placeholder={'Year Joined'} label={'year joined:'} />
                </div>
                <h3 className="text-darkchoco drop-shadow text-4xl text-center mb-5">
                  about
                </h3>
                <form onSubmit={e => updateAbout()} className="flex flex-col">
                  <div className="shadow bg-white rounded-2xl mb-4">
                    <label>
                      <textarea value={myAbout} onChange={e => changeAbout(e)} className="p-6 w-full h-60 text-2xl rounded-2xl" />
                    </label>
                  </div>
                  <input className="shadow-md mb-5 text-3xl text-center px-10 py-4 rounded-2xl bg-chocolate text-white cursor-pointer" type="submit" value="submit" />
                </form>
              </div>
            </div>

            <div className="flex flex-col col-span-4 bg-light_matcha my-10 mr-10 px-16 pt-16 pb-14 rounded-3xl shadow-xl">
              <RenderUserCheckboxes all_users={all_users} users_selected={users_chatted} setUsers_selected={setUsers_chatted} label={'People you already chatted with:'}/>
              <RenderUserCheckboxes all_users={all_users} users_selected={users_blocked} setUsers_selected={setUsers_blocked} label={'People you do not wish to coffee chat'}/>
              <RenderCheckbox items={ACTIVITIES} item_labels={ACTIVITIES} items_checked={activities} setItems_checked={setActivities} label={'Select fun activities you want to do in your chat!'}/>
              <button onClick={e => submit()} type="submit" className="w-60 self-center shadow appearance-none border rounded-lg py-5 px-6 mt-2 text-chocolate bg-lightchoco border-t-0 border-l-1 border-r-4 border-b-4 border-chocolate text-2xl leading-tight font-medium">
                  {created_account ? `Update!` : `Complete!`}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UserForm
