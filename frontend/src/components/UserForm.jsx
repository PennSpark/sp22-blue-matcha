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

const pfpPlaceholder = 'http://kmvkf2hvhfn2vj9tl8e6ps7v-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/default-img.png'

const UserForm = () => {
    const [userPfp, setUserPfp] = useState(pfpPlaceholder)
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

    const [pfpModalVisible, setPfpModalVisible] = useState(false)

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
            }
          }
        getUsers()
        getUserdetails()
    }, [])

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
            <label className="block text-dark_matcha text-2xl p-8 border-t-4 border-dotted border-dark_matcha">{label}</label>
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
        <label className="block text-dark_matcha text-2xl p-8 border-t-4 border-dotted border-dark_matcha">{label}</label>
        {retrieved_users && <Checkbox items={userLogins} item_labels={labels} items_checked={users_selected} setItems_checked={setUsers_selected}/>}
      </div>
      )
    }

    const PfpModal = () => {
      if (pfpModalVisible) {
        if (userPfp === pfpPlaceholder) {
          return <ProfileModal setModalVisible={setPfpModalVisible} setPfp={setUserPfp} oldImage="" />
        }
        return <ProfileModal setModalVisible={setPfpModalVisible} setPfp={setUserPfp}oldImage={userPfp} />
      }
      return <></>
    }
  
    return (
      <div>
        <PfpModal />
        <div className="flex justify-center mt-20 mb-20 font-mono">
          <div className="grid grid-cols-5 bg-light_matcha w-3/4 h-5/6 p-20 rounded-3xl shadow-lg">
            <div className="col-span-full flex flex-col justify-center items-center">
              <h1 className="text-dark_matcha font-semibold text-6xl mb-8 mt-8">Update Your User Info</h1>
              <div className = "grid grid-cols-2 place-items-center font-medium gap-x-12 mb-12">
                <button onClick={e => setPfpModalVisible(true)} type='button' className="col-span-2 my-5 mb-8">
                  <img src={userPfp} alt="" className="object-cover w-52 h-52 rounded-full border-2 border-matcha shadow-md hover:shadow-lg" />
                </button>
                <div className="mb-4">
                  <label className="block text-dark_matcha text-2xl mt-1"> {'first name:'} </label>
                  <input onChange={e => setLast_name(e.target.value)} value={first_name} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'first name'} />
                </div>
                <div className="mb-4">
                  <label className="block text-dark_matcha text-2xl mt-1"> {'last name:'} </label>
                  <input onChange={e => setLast_name(e.target.value)} value={last_name} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'last name'} />
                </div>
                <div className="mb-4">
                  <label className="block text-dark_matcha text-2xl mt-1"> {'phone number:'} </label>
                  <input onChange={e => setPhone_number(e.target.value)} value={phone_number} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'phone number'} />
                </div>
                <div className="mb-4">
                  <label className="block text-dark_matcha text-2xl mt-1"> {'email:'} </label>
                  <input onChange={e => setEmail(e.target.value)} value={email} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'email'} />
                </div>
                <RenderDropdown items={['Female', 'Male', 'Other']} value={gender} setValue={setGender} placeholder={'Gender'} label={'gender:'} />
                <RenderDropdown items={Array.from(new Array(7), (x, i) => i + CURR_YEAR)} value={year_of_grad} setValue={setYear_of_grad} placeholder={'Graduating Year'} label={'graduating year:'} />
                <div className="mb-4">
                  <label className="block text-dark_matcha  text-2xl mt-1"> {'major:'} </label>
                  <input onChange={e => setMajor(e.target.value)} value={major} className="w-80 mt-2 shadow border rounded-lg py-4 px-3 text-center text-black text-lg leading-tight focus:outline-none focus:shadow-outline focus:border-lemon" type="text" placeholder={'major'} />
                </div>
                <RenderDropdown items={SPARK_ROLES} value={spark_role} setValue={setSpark_role} placeholder={'Spark Role'} label={'spark role:'} />
                <RenderDropdown items={Array.from(new Array(5), (x, i) => i - 4 + CURR_YEAR)} value={year_joined_spark} setValue={setYear_joined_spark} placeholder={'Year Joined Spark'} label={'year joined spark:'} />
              </div>
              <RenderUserCheckboxes all_users={all_users} users_selected={users_chatted} setUsers_selected={setUsers_chatted} label={'People you already chatted with:'}/>
              <RenderUserCheckboxes all_users={all_users} users_selected={users_blocked} setUsers_selected={setUsers_blocked} label={'People you do not wish to coffee chat'}/>
              <RenderCheckbox items={ACTIVITIES} item_labels={ACTIVITIES} items_checked={activities} setItems_checked={setActivities} label={'select fun activities you want to do in your chat!'}/>
              <button onClick={e => submit()} type="submit" className="w-60 shadow appearance-none border rounded-lg py-4 px-3 mt-2 text-orange-700 bg-orange-200 text-lg leading-tight">
                  {created_account ? `Update!` : `Complete!`}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UserForm
