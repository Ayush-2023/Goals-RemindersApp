const mongoose = require("mongoose")
const { Schema } = mongoose

const { Task } = require("./task")

const goalTaskSchema = Schema( {
    isComplete: {
        type: Boolean,
        default: false
    }
})

const GoalTask = Task.discriminator("GoalTask", goalTaskSchema)

module.exports.GoalTask = GoalTask