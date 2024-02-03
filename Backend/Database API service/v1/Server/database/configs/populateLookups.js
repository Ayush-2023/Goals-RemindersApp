const { months } = require("../models/lookup/month")
const { weekDays } = require("../models/lookup/weekday")


const populateLookups = async () => {
    for(let month of months) {
        await month.save()
    }
    for(let weekDay of weekDays) {
        await weekDay.save()
    }
}

populateLookups()
.then( () => {
    console.log("Lookups Populated")
})

