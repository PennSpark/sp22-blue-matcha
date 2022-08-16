const times = require('./calendar.json')

const ALLTIMES = times.dates_blocked 
const DAYSOFWEEK = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

exports.generateAvailability = (personA, personB) => {
    let all_times = ALLTIMES.map(date => new Date(date))
    const proxyA = [...personA]
    const proxyB = [...personB]
    const dateFind = (arr, item) => (arr.find(date => date.getTime() === item.getTime()) ? true : false)
    const available_times = all_times.filter(item => !dateFind(proxyA, item) && !dateFind(proxyB, item))
    const sortTimes = available_times.sort((a, b) => a - b)
    //console.log(sortTimes)
    const toMinutes = dif => {
        return Math.round((dif/1000)/60)
    }
    const allTimeBlocks = []
    let block = [sortTimes.length > 0 ? sortTimes[0]: null]
    for (let i = 1; i < sortTimes.length; i++) {
        let date1 = new Date(sortTimes[i])
        let date2 = new Date(sortTimes[i - 1])
        let length = date1.getTime()- date2.getTime()
        if (toMinutes(length) < 35) {
            block.push(sortTimes[i])
        } else {
            allTimeBlocks.push(block)
            block = []
            block.push(sortTimes[i])
        }
    }
    allTimeBlocks.push(block)
    const sortedTimeBlocks = allTimeBlocks.sort((a, b) => b.length - a.length)
    const slicedArray = sortedTimeBlocks.slice(0, 5)
    return timesToString(slicedArray)
}

const timesToString = slicedArray => {
    const times = []
    slicedArray.forEach(obj => {
        if (obj.length > 2) {
            let obj1 = new Date(obj[1])
            let obj2 = new Date(obj[obj.length - 1])
            times.push(`${dateToString(obj1)} - ${dateToString(obj2)}`)
        }
    })
    return times
}

const dateToString = date => {
    const day = DAYSOFWEEK[date.getDay()]
    let zone = `AM`
    let time = date.getHours()
    time > 12 ? (time-=12, zone = `PM`) : zone = `AM`
    const minutes = date.getMinutes() > 0 ? `${date.getMinutes()}` : `${date.getMinutes()}0`
    return `${day} ${time}:${minutes} ${zone}`
}
