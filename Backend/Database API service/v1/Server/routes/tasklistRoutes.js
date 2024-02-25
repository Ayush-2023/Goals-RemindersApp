const express = require("express")
const tasklistRouter = express.Router()
const { userVerification } = require("../middlewares/userAuthenticationMiddleware")
const tasklistController = require("../controllers/tasklistController")
const { validationForTasklistAccess, findTasklistWithID } = require("../middlewares/requestAuthorizationMiddleware")


tasklistRouter.use("/", (req, res, next) => {
    console.log("User Tasklist Route")
    next()
})

tasklistRouter
    .get("/:tasklistID", express.json(), userVerification, validationForTasklistAccess, findTasklistWithID, tasklistController.getTasklistWithID)
    .get("/:tasklistID/tasks", express.json(), userVerification, validationForTasklistAccess, findTasklistWithID, tasklistController.getTasksFromTasklistWithID)
    .post("/", express.json(), userVerification, tasklistController.createTasklist)

module.exports = {
    tasklistRouter
}