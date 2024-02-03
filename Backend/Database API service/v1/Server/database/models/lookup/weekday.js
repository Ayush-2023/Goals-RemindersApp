const mongoose = require("mongoose")
const { Schema } = mongoose

const weekDays = [ "Sunday", "Monday", "Teusday", "Wednesday",  "Thursday", "Friday", "Saturday"]

const weekdaySchema = Schema( {
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})

const WeekDay = mongoose.model("WeekDay", weekdaySchema)

module.exports = {
    weekDays, 
    WeekDay
}