const mongoose = require("mongoose")
const { Schema } = mongoose

const { Tasklist } = require("./task-list")

const reminderSchema = Schema( {
    routineTasks: [{
        type: mongoose.Types.ObjectId,
        ref: "RoutineTask"
    }],
    scheduledTasks: [{
        type: mongoose.Types.ObjectId,
        ref: "ScheduledTask"
    }]
})

const Reminder = Tasklist.discriminator("Reminder", reminderSchema)

module.exports.Reminder = Reminder