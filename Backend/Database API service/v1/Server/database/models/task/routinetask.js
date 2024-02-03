const mongoose = require("mongoose")
const { Schema } = mongoose

const { Task } = require("./task")

const routineTaskSchema = Schema( {
    duration: {
        type: mongoose.Types.ObjectId,
        ref: "RoutineDuration", 
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastAcknowledgement: {
        type: Date,
        default: null
    }
})

const RoutineTask = Task.discriminator("RoutineTask", routineTaskSchema)

module.exports.RoutineTask = RoutineTask