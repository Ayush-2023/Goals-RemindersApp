const express = require("express")
const userRouter = express.Router()

const userController = require("../controllers/userController")
const { userValidation } = require("../middlewares/userAuthenticationMiddleware")

userRouter.use("/", (req, res, next) => {
    console.log("User Route")
    next()
})

userRouter
    .get("/:userID", userValidation, userController.getUserForID)
    .get("/:userID/tasklists", userValidation, userController.getTasklistsForUserWithID)
    .get("/:userID/reminders", userValidation, userController.getRemindersForUserWithID)
    .get("/:userID/goals", userValidation, userController.getGoalsForUserWithID)
    .post("/", express.json( { type: "application/json"}) ,userController.createUser)

module.exports = {
    userRouter
}