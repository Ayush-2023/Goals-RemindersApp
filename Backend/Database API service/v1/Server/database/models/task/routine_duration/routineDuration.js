const mongoose = require("mongoose")
const { Schema } = mongoose

const options = {
    discriminatorKey: "type",
    timestamps: true
}

const routineDurationSchema = Schema( { }, options)

const RoutineDuration = mongoose.model("RoutineDuration", routineDurationSchema)

module.exports.RoutineDuration = RoutineDuration