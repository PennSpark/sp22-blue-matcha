import ScheduleSelector from 'react-schedule-selector'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SELECTED_COLOR = '#687d63' //dark matcha
const HOVERED_COLOR = '#ACD1A3' //green tea
const UNSELECTED_COLOR = '#C6E4BE' //light green tea
const DATE = new Date('2022-04-19T00:00:00.000+00:00')

const Schedule = () => {
    const [schedDates, setSchedDates] = useState([])
    const [receivedDates, setReceivedDates] = useState([])
    useEffect(() => {
      const loadCurrDates = async () => {
        await axios.get('/datesblocked').then(response => {
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
      await axios.post('updatecalendar', {dates}).then(console.log('success')).catch(error => {
          console.log(error) //test
      })
      //reload to a different window
    }
    const handleChange = newSchedule => setSchedDates(newSchedule)
    return (
      <div className='flex flex-col items-center flex-align-center w-3/4'>
        <div className="block justify-center text-dark_matcha font-semibold font-mono text-2xl mt-1 mb-5" >
          Update your blocked-off times:
        </div>
        <div className='flex justify-center mb-20'>
          <button onClick={e => submitTimes()} type="submit" className="shadow appearance-none border rounded-lg py-4 bg-light_matcha px-3 mt-2 text-lg leading-tight">
          {`Update Blocked Dates`}</button>
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
    )
}

export default Schedule