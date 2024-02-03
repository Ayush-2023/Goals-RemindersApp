const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then( () => console.log("Database connected..."))
.catch( (error) => {
    console.error(error)
})

module.exports.mongoose = mongoose