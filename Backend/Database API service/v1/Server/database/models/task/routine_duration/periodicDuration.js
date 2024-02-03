const mongoose = require("mongoose")
const { Schema } = mongoose

const { RoutineDuration } = require("./routineDuration")

const periodicDurationSchema = Schema ({
    afterDays: [{
        type: Number,
        default: 1, 
        min: 1,
    }],
    noOfDays: {
        type: Number,
        required: true,
        min: 1
    }
})

const PeriodicDuration = RoutineDuration.discriminator("PeriodicDuration", periodicDurationSchema)

module.exports.PeriodicDuration = PeriodicDuration