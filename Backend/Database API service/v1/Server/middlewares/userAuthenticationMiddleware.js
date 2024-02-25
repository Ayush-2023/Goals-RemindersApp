const mongoose = require("mongoose")
const { User } = require("../database/models/user/user")
const { UnauthorizedError } = require("../ErrorHandling/UnauthorizedError")

const getUserWithID = async (userID) => {

    if(!userID || !mongoose.Types.ObjectId.isValid(userID)) {
<<<<<<< HEAD
        throw new UnauthorizedError("Unauthentic User: Inalid userID")
=======
        throw UnauthorizedError("Unauthentic User: Inalid userID")
>>>>>>> 7a5f80e35db74db23b8e52d013726351bfba7437
    }

    const user = await User.findById( userID)

    if(!user) {
<<<<<<< HEAD
        throw new UnauthorizedError("Unauthentic User: Incorrect userID")
=======
        throw UnauthorizedError("Unauthentic User: Incorrect userID")
>>>>>>> 7a5f80e35db74db23b8e52d013726351bfba7437
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