const mongoose = require("mongoose")
const { Schema } = mongoose

const { RoutineDuration } = require("./routineDuration")

const weeklyDurationSchema = Schema ({
    daysOfWeek: [{
        type: mongoose.Types.ObjectId,
        ref: "WeekDay", 
        required: true
    }],
    noOfWeeks: {
        type: Number,
        default: 1,
        min: 1
    }
})

const WeeklyDuration = RoutineDuration.discriminator("WeeklyDuration", weeklyDurationSchema)

module.exports.WeeklyDuration = WeeklyDuration