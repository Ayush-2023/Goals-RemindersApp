const mongoose = require("mongoose")
const { Schema } = mongoose

const options = {
    discriminatorKey: "category",
    timestamps: true
}

const tasklistSchema = Schema( {
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
    }
}, options)

const Tasklist = mongoose.model("Tasklist", tasklistSchema)

module.exports.Tasklist = Tasklist