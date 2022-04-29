import ScheduleSelector from 'react-schedule-selector'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const SELECTED_COLOR = '#687d63' //dark matcha
const HOVERED_COLOR = '#ACD1A3' //green tea
const UNSELECTED_COLOR = '#C6E4BE' //light green tea
const DATE = new Date('2022-04-19T00:00:00.000+00:00')

const throwError = error => toast.error(`${error.response.data.message}`, { icon: '🥲' })

const Schedule = () => {
    const [schedDates, setSchedDates] = useState([])
    const [receivedDates, setReceivedDates] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
      const loadCurrDates = async () => {
        await axios.get('/api/datesblocked').then(response => {
          if (response.status === 200) {
              setSchedDates(response.data.dates_blocked)
              console.log(response.data.dates_blocked)
              setReceivedDates(true)
          }
        })
      }
      loadCurrDates()
    }, [])

    const submitTimes = async () => {
      const dates = schedDates
      await axios.post('updatecalendar', {dates})
      .then(
        navigate('/profile')
      )
      .catch(error => {
        throwError()
      })
    }

    const handleChange = newSchedule => setSchedDates(newSchedule)
    return (
      <div className="flex justify-center bg-dark_matcha w-screen h-screen font-mono">
        <div className='flex overflow-scroll flex-col items-center flex-align-center w-3/4 mt-10 mb-10 p-10 bg-white shadow-xl border-8 border-white border-double rounded-2xl'>
          <div className="block justify-center text-dark_matcha font-semibold font-mono text-3xl mt-1 mb-5" >
            Update your blocked-off times:
          </div>
          <div className='flex justify-center mb-20'>
            <button onClick={e => submitTimes()} type="submit" className="shadow appearance-none border rounded-lg bg-light_greentea text-dark_matcha border-t-0 border-l-1 border-r-4 border-b-4 border-dark_matcha active:bg-dark_matcha active:text-light_matcha px-16 py-5 mt-2 text-xl font-mono font-medium leading-tight">
            {`Update`}</button>
          </div>
          <ScheduleSelector
              selection={schedDates}
              startDate={DATE}
              numDays={7}
              minTime={10}
              maxTime={22}
              hourlyChunks={2}
              timeFormat={'hh:mm A'}
              dateFormat={'ddd'}
              selectedColor={SELECTED_COLOR}
              hoveredColor={HOVERED_COLOR}
              unselectedColor={UNSELECTED_COLOR}
              onChange={handleChange}
            />
        </div>
      </div>
    )
}

export default Schedule