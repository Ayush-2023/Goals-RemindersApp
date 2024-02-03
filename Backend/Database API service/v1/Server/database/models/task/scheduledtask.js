const mongoose = require("mongoose")
const { Schema } = mongoose

const { Task } = require("./task")

const scheduledTaskSchema = Schema( {
    scheduledTime: {
        type: Date,
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    }
})

const ScheduledTask = Task.discriminator("ScheduledTask", scheduledTaskSchema)

module.exports.ScheduledTask = ScheduledTask