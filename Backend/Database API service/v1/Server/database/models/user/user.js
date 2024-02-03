const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = Schema( {
    name: {
        type: String,
        required: true,
        unique: [true, " Username should be unique"]
    },
    tasklists:  {
        type: [{
            type: mongoose.Types.ObjectId, 
            ref: "Tasklist"
        }],
        required: true,
        default: []
    }   
}, {
    timestamps: true
})

module.exports.User = mongoose.model("User", userSchema)