const mongoose = require("mongoose")
const { User } = require("../database/models/user/user")
const { UnauthorizedError } = require("../ErrorHandling/UnauthorizedError")

const getUserWithID = async (userID) => {

    if(!userID || !mongoose.Types.ObjectId.isValid(userID)) {
        throw UnauthorizedError("Unauthentic User: Inalid userID")
    }

    const user = await User.findById( userID)

    if(!user) {
        throw UnauthorizedError("Unauthentic User: Incorrect userID")
    }

    return user
}

const userValidation = async (req, res, next) => {
    const { userID } = req.params

    const user = await getUserWithID(userID)

    req.body = {
        user: user
    }

    next()
}

const userVerification = async (req, res, next) => {
    const { userID } = req.body

    const user = await getUserWithID(userID)

    req.body.user = user

    next()
}



module.exports = {
    userValidation, 
    userVerification
}