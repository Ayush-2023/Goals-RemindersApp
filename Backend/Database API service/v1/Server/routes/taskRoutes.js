const express = require("express")
const taskRouter = express.Router()
const { userVerification } = require("../middlewares/userAuthenticationMiddleware")
const { validationForTaskAccess, validationForTasklistAccess, findTasklistWithID } = require("../middlewares/requestAuthorizationMiddleware")

const taskController = require("../controllers/taskController")

taskRouter.use("/", (req, res, next) => {
    console.log("User Task Route")
    next()
})

taskRouter
    .get("/:taskID", express.json( { type: "application/json"}), userVerification, validationForTaskAccess, taskController.getTaskWithID)
    .post("/", express.json( { type: "application/json"}), userVerification, validationForTasklistAccess, taskController.createTask)

module.exports = {
    taskRouter
}