const { mongoose } = require("../database/configs/connect")
const { Tasklist } = require("../database/models/task-list/task-list")
const { Goal } = require("../database/models/task-list/goal")
const { Reminder } = require("../database/models/task-list/reminder")
const { Task } = require("../database/models/task/task")

async function saveNewTasklistForUser(user, tasklist) {
    try {
        await tasklist.save()
        user.tasklists.push(tasklist)
        await user.save()
    } catch (error) {
        throw new Error("Unable to save new tasklist")
    }
}

function createGoal(title, description, deadline) {
    if (!deadline) {
        res.status(400).json({
            error: "Bad request, Goals need deadline"
        })
    } else {
        return new Goal({
            title: title,
            description: description,
            deadline: req.body.deadline
        })
    }
}

function createReminder(title, description) {
    return new Reminder({
        title: title,
        description: description
    })
}

const authorizeTasklistAccess = ( user, tasklistID ) => {

    if (!mongoose.Types.ObjectId.isValid(tasklistID)) {
        res.status(400).json( {
            error: "Bad Request, provide valid tasklistID"
        })
        return false
    }

    if (!user || !user.tasklists.find( id => id.equals( new mongoose.Types.ObjectId(tasklistID)))) {
        res.status(403).json({
            error: "Forbidden"
        })
        return false
    }
    return true
}

const getTasklistWithID = async (req, res) => {
    const { tasklistID } = req.params
    const { user } = req.body

    if(!authorizeTasklistAccess(user, tasklistID)) {
        return
    }

    const tasklist = await Tasklist.findById(tasklistID)

    if (!tasklist) {
        res.status(404).json({
            error: "Could not find tasklist"
        })
    } else {
        res.status(200).json({
            tasklist: tasklist
        })
    }
}

const createTasklist = async (req, res) => {
    const { user, title, description, category, deadline } = req.body

    const tasklist = (() => {
        if (category === "Goal") {
            return createGoal(title, description, deadline)
        } else if (category === "Reminder") {
            return createReminder(title, description)
        }else {
            res.status(400).json({
                error: "Bad request, Cannot interpret tasklist category"
            })
        }
    })()

    try {
        await saveNewTasklistForUser(user, tasklist)
        res.status(201).json({
            id: tasklist.id
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Error, " + error.message
        })
    }
}

const getTasksFromTasklistWithID = async (req, res) => {
    const { tasklistID } = req.params
    const { user } = req.body

    if(!authorizeTasklistAccess(user, tasklistID)) {
        return
    }

    const tasklist = await Tasklist.findById(tasklistID)

    if(!tasklist) {
        res.status(404).json({
            error: "Cannot find tasklist with given ID"
        })
        return
    }
    let tasks = []
    if(tasklist.category === "Goal") {
        for(let taskID of tasklist.goalTasks) {
            tasks.push(await Task.findById(taskID))
        }
    }else if(tasklist.category === "Reminder") {
        for(let taskID of tasklist.routineTasks) {
            tasks.push(await Task.findById(taskID))
        }
        for(let taskID of tasklist.scheduledTasks) {
            tasks.push(await Task.findById(taskID))
        }
    }

    res.status(200).json( {
        tasks: tasks
    })
}

module.exports = {
    createTasklist,
    getTasklistWithID,
    getTasksFromTasklistWithID
}