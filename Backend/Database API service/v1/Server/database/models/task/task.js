const mongoose = require("mongoose")
const { Schema } = mongoose

const options = {
    discriminatorKey: "category",
    timestamps: true
}

const taskSchema = Schema( {
    title: {
        type: String, 
        required: true
    }
}, options)

const Task = mongoose.model("Task", taskSchema)

module.exports.Task = Task