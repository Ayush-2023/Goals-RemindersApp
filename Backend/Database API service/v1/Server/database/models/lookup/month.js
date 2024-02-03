const mongoose = require("mongoose")
const { Schema } = mongoose

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 

const monthSchema = Schema( {
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
})

const Month = mongoose.model("Month", monthSchema)

module.exports = {
    months,
    Month
}