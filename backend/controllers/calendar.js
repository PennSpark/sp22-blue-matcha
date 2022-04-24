const times = require('./dates.json');
const test = require('./tests.json');
var User = require('../models/user');

const STARTINGDATE = new Date('2022-04-18T12:00:00.000+00:00')
const ALLTIMES = times.dates_blocked 
const NUMINTERVALS = 24
const DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const doFunction = () => {
    User.findOne({'userLogin': 'alyssan'}).selected({dates_blocked: 1, _id: 0}).exec(
        function (err, results) {
            console.log(results)
        }
    )
}

doFunction()

const generateAvailability = (personA, personB) => {
    const available_times = ALLTIMES.filter(item => !(personA.includes(item) || personB.includes(item)))
    const sortTimes = available_times.sort((a, b) => a - b)
    //console.log(sortTimes)
    const toMinutes = dif => {
        return Math.round((dif/1000)/60)
    }
    const allTimeBlocks = []
    let block = []
    let firstTime = null
    for (let i = 1; i < sortTimes.length; i++) {
        let length = sortTimes[i].$date.$numberLong - sortTimes[i - 1].$date.$numberLong
        if (toMinutes(length) < 35) {
            block.push(sortTimes[i])
        } else {
            allTimeBlocks.push(block)
            block = []
            block.push(sortTimes[i])
        }
    }
    const sortedTimeBlocks = allTimeBlocks.sort((a, b) => b.length - a.length)
    const slicedArray = sortedTimeBlocks.slice(0, 5);
    return timesToString(slicedArray)
}

const timesToString = slicedArray => {
    const times = []
    slicedArray.forEach(obj => {
        if (obj.length > 2) {
            console.log(obj[0].$date.$numberLong)
            const obj1 = (new Date(obj[0].$date.$numberLong))
            const obj2 = (new Date(obj.at(-1).$date.$numberLong))
            console.log(obj1)
            times.push(`${dateToString(obj1)} - ${dateToString(obj2)}`)
        }
    })
    return times
}

const dateToString = date => {
    const day = DAYSOFWEEK[date.getDay() - 1]
    let zone = `AM`
    let time = date.getHours()
    time >= 12 ? (time-=12, zone = `PM`) : zone = `AM`
    const minutes = date.getMinutes() > 0 ? `${date.getMinutes()}` : `${date.getMinutes()}0`
    return `${day} ${time}:${minutes} ${zone}`
}

console.log(generateAvailability(test.user_a, test.user_b))