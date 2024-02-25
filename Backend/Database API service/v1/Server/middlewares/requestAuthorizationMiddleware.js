const mongoose = require("mongoose")
const { InvalidDataError } = require("../ErrorHandling/InvalidDataError")
const { ForbiddenAccessError } = require("../ErrorHandling/ForbiddenAccessError")
const { ResourceNotFoundError } = require("../ErrorHandling/ResourceNotFoundError")
const { InternalServerError } = require("../ErrorHandling/InternalServerError")

const matchID = (objectID, targetID) => objectID.equals(new mongoose.Types.ObjectId(targetID))

const getTasklistWithID = async (tasklistID) => {
    const tasklist = await User.findById( tasklistID)

    if(!tasklist) {
        throw new ResourceNotFoundError("Resource Not Found: Unable to find the requested tasklist ")
    }

    return tasklist
}

const validateTasklistAccess = async (user, tasklistID) => {
    if(!tasklistID || !mongoose.Types.ObjectId.isValid(tasklistID)) {
        throw new InvalidDataError("Bad Request: Provide valid tasklistID")
    }

    if (!user || !user.tasklists.find( objectID => matchID(objectID, tasklistID))) {
        throw new ForbiddenAccessError("Forbidden Access: Could not find tasklist with given ID for user")
    }
}

const validateTask = (tasklist, taskID) => {
    if(!taskID || !mongoose.Types.ObjectId.isValid(taskID)) {
        throw new InvalidDataError("Bad Request: Provide valid taskID")
    }

    if(tasklist.category === "Goal") {
        if (!tasklist.goaltasks.find(objectID => matchID(objectID, taskID))) {
            throw new InvalidDataError("Bad Request: No task with given ID in tasklist")
        }
    }else if(tasklist.category === "Reminder"){
        if (!tasklist.routineTasks.find(objectID => matchID(objectID, taskID)) && 
        (!tasklist.scheduledTasks.find(objectID => matchID(objectID, taskID)))) {
            throw new InvalidDataError("Bad Request: No task with given ID in tasklist")
        }
    }else {
        throw new InternalServerError("Internal Server Error: Found Invalid category for tasklist")
    }
}

const findTasklistWithID = async (req, res, next) => {
    const { tasklistID } = req.body

    const tasklist = await getTasklistWithID(tasklistID)

    req.body.tasklist = tasklist
    
    next()
}

const validationForTasklistAccess = async (req, res, next) => {
    const { tasklistID } = req.params
    const { user } = req.body

    validateTasklistAccess(user, tasklistID)

    req.body.tasklistID = tasklistID

    next()
}



const validationForTaskAccess = async (req, res, next) => {
    const { taskID } = req.params
    const { user, tasklistID } = req.body

    validateTasklistAccess(user, tasklistID)

    const tasklist = getTasklistWithID(tasklistID)

    validateTask(tasklist, taskID)

    req.body.tasklist = tasklist

    next()
}

module.exports = {
    validationForTasklistAccess,
    validationForTaskAccess,
    findTasklistWithID
}