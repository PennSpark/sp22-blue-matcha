import ScheduleSelector from 'react-schedule-selector'
import React, { useState, useEffect } from 'react'

const SELECTED_COLOR = '#687d63' //dark matcha
const HOVERED_COLOR = '#ACD1A3' //green tea
const UNSELECTED_COLOR = '#C6E4BE' //light green tea

const Schedule = () => {
    const [dates, setDates] = useState([])
    const handleChange = newSchedule => setDates(newSchedule)
    return (
      <div>
        <div className="block justify-center text-dark_matcha font-semibold font-mono text-2xl mt-1 mb-5" >
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
      </div>
    )
}

export default Schedule