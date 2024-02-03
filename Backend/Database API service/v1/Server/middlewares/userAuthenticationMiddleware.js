const mongoose = require("mongoose")
const { User } = require("../database/models/user/user")

const getID = (req) => {
    return req.params.userID || (!req.body ? undefined : req.body.userID)
}

const userAuthentication = async (req, res, next) => {
    const userID = getID(req)
    if(!userID || !mongoose.Types.ObjectId.isValid(userID)) {
        res.status(401).json( {
            error: "Need UserID for access"
        })
        return 
    }

    const user = await User.findById( userID)
    if(!user) {
        res.status(403).json( {
            error: "User does not exist"
        })
        return
    }
    if(!req.body) {
        req.body = {
            user: user
        }
    }else {
        req.body.user = user
    }
    next()
}

module.exports = {
    userAuthentication
}