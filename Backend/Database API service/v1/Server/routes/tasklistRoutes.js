const express = require("express")
const tasklistRouter = express.Router()
const { userAuthentication } = require("../middlewares/userAuthenticationMiddleware")
const tasklistController = require("../controllers/tasklistController")

tasklistRouter.use("/", (req, res, next) => {
    console.log("User Tasklist Route")
    next()
})

tasklistRouter
    .get("/:tasklistID", express.json(), userAuthentication, tasklistController.getTasklistWithID)
    .get("/:tasklistID/tasks", express.json(), userAuthentication, tasklistController.getTasksFromTasklistWithID)
    .post("/", express.json(), userAuthentication, tasklistController.createTasklist)

module.exports = {
    tasklistRouter
}