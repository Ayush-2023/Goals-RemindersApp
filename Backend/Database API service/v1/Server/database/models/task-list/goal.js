const mongoose = require("mongoose")
const { Schema } = mongoose

const { Tasklist } = require("./task-list")

const goalSchema = Schema( {
    goalTasks: {
        type: [{
        type: mongoose.Types.ObjectId,
        ref: "GoalTask",
        required: true
        }],
        required: true,
        default: []
    },
    deadline: {
        type: Date
    }
})

const Goal = Tasklist.discriminator("Goal", goalSchema)

module.exports.Goal = Goal