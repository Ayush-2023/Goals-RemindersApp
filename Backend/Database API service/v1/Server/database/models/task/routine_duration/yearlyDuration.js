const mongoose = require("mongoose")
const { Schema } = mongoose

const { RoutineDuration } = require("./routineDuration")

const yearlyDurationSchema = Schema ({
    dates: [{
        month: {
            type: mongoose.Types.ObjectId,
            ref: "Month",
            required: true
        }, 
        day: {
            type: Number,
            required: true,
            min: 1,
            max: 31
        }
    }],
    noOfYears: {
        type: Number,
        default: 1,
        min: 1
    }
})

const YearlyDuration = RoutineDuration.discriminator("YearlyDuration", yearlyDurationSchema)

module.exports.YearlyDuration = YearlyDuration