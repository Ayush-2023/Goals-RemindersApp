const express = require("express")
const taskRouter = express.Router()

const taskController = require("../controllers/taskController")

taskRouter.use("/", (req, res, next) => {
    console.log("User Task Route")
    next()
})

taskRouter
    .get("/:taskID", express.json( { type: "application/json"}), taskController.getTaskWithID)
    .post("/", express.json( { type: "application/json"}), taskController.createTask)

module.exports = {
    taskRouter
}