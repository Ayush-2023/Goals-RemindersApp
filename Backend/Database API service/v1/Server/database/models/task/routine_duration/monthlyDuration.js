const mongoose = require("mongoose")
const { Schema } = mongoose

const { RoutineDuration } = require("./routineDuration")

const monthlyDurationSchema = Schema ({
    days: [{
        type: Number,
        required: true,
        min: 1,
        max: 31
    }],
    noOfMonths: {
        type: Number,
        default: 1,
        min: 1
    }
})

const MonthlyDuration = RoutineDuration.discriminator("MonthlyDuration", monthlyDurationSchema)

module.exports.MonthlyDuration = MonthlyDuration