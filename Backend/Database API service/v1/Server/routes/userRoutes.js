const express = require("express")
const userRouter = express.Router()

const userController = require("../controllers/userController")
const { userAuthentication } = require("../middlewares/userAuthenticationMiddleware")
userRouter.use("/", (req, res, next) => {
    console.log("User Route")
    next()
})

userRouter
    .get("/:userID", userAuthentication, userController.getUserForID)
    .get("/:userID/tasklists", userAuthentication, userController.getTasklistsForUserWithID)
    .get("/:userID/reminders", userAuthentication, userController.getRemindersForUserWithID)
    .get("/:userID/goals", userAuthentication, userController.getGoalsForUserWithID)
    .post("/", express.json( { type: "application/json"}) ,userController.createUser)

module.exports = {
    userRouter
}