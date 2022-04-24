import ScheduleSelector from 'react-schedule-selector'
import React, { useState, useEffect } from 'react'

const SELECTED_COLOR = '#687d63' //dark matcha
const HOVERED_COLOR = '#ACD1A3' //green tea
const UNSELECTED_COLOR = '#C6E4BE' //light green tea

const Schedule = () => {
    const [dates, setDates] = useState([])
    const handleChange = newSchedule => setDates(newSchedule)

    // TODO: axios post the newly submitted schedule for user

    return (
      <div className="w-3/4">
        <div className="flex justify-center text-dark_matcha font-semibold font-mono text-5xl mt-1 mb-14" >
          Update your blocked-off times:
        </div>
        <ScheduleSelector
        selection={dates}
        numDays={7}
        minTime={8}
        maxTime={23}
        hourlyChunks={2}
        timeFormat={'hh:mm A'}
        dateFormat={'ddd'}
        selectedColor={SELECTED_COLOR}
        hoveredColor={HOVERED_COLOR}
        unselectedColor={UNSELECTED_COLOR}
        onChange={handleChange}
        />
        <button onClick={console.log('create a new method that handles this')} type='submit' className="flex justify-center, shadow appearance-none border rounded-xl py-5 px-7 mt-8 text-dark_matcha bg-matcha text-xl leading-tight">
          submit availability
        </button>
      </div>
    )
}

export default Schedule