const { mongoose } = require("../database/configs/connect")
const { Tasklist } = require("../database/models/task-list/task-list")
const { Goal } = require("../database/models/task-list/goal")
const { Reminder } = require("../database/models/task-list/reminder")
const { Task } = require("../database/models/task/task")
const { InsufficientDataError } = require("../ErrorHandling/InsufficientDataError")
const { InvalidDataError } = require("../ErrorHandling/InvalidDataError")
const { InternalServerError } = require("../ErrorHandling/InternalServerError")

const saveNewTasklistForUser = async (user, tasklist) => {
    try {
        await tasklist.save()
        user.tasklists.push(tasklist)
        await user.save()
    } catch (error) {
<<<<<<< HEAD
        throw new InternalServerError("Internal Server Error: Unable to save tasklist")
=======
        throw InternalServerError("Internal Server Error: Unable to save tasklist")
>>>>>>> 7a5f80e35db74db23b8e52d013726351bfba7437
    }
}

function createGoal(title, description, deadline) {
    if (!deadline || !title || !description) { 
<<<<<<< HEAD
        throw new InsufficientDataError("Bad Request: Provide parameters for creating Goal")
=======
        throw InsufficientDataError("Bad Request: Provide parameters for creating Goal")
>>>>>>> 7a5f80e35db74db23b8e52d013726351bfba7437
    }

    return new Goal({
        title: title,
        description: description,
        deadline: deadline
    })
}

function createReminder(title, description) {
    if (!title || !description) { 
<<<<<<< HEAD
        throw new InsufficientDataError("Bad Request: Provide parameters for creating Goal")
=======
        throw InsufficientDataError("Bad Request: Provide parameters for creating Goal")
>>>>>>> 7a5f80e35db74db23b8e52d013726351bfba7437
    }

    return new Reminder({
        title: title,
        description: description
    })
}

const getTasklistWithID = async (req, res) => {
    const { tasklist } = req.body
    
    return res.status(200).json({
        tasklist: tasklist
    })
}

const createTasklist = async (req, res) => {
    const { user, title, description, category, deadline } = req.body

    let tasklist = undefined

    if (category === "Goal") {
        tasklist = createGoal(title, description, deadline)
    } else if (category === "Reminder") {
        tasklist = createReminder(title, description)
    } else {
<<<<<<< HEAD
        throw new InvalidDataError("Bad Request: Provide valid category of tasklist")
=======
        throw InvalidDataError("Bad Request: Provide valid category of tasklist")
>>>>>>> 7a5f80e35db74db23b8e52d013726351bfba7437
    }

    await saveNewTasklistForUser(user, tasklist)

    res.status(201).json({
        id: tasklist.id
    })
}

const getTasksFromTasklistWithID = async (req, res) => {
    const { tasklist } = req.body

    let tasks = {
        goalTasks: [],
        reminders:  {
            routineTasks: [],
            scheduledTasks: []
        }
    }

    if(tasklist.category === "Goal") {
        for(let taskID of tasklist.goalTasks) {
            tasks.goalTasks.push(await Task.findById(taskID))
        }
    } else if(tasklist.category === "Reminder") {
        for(let taskID of tasklist.routineTasks) {
            tasks.reminders.routineTasks.push(await Task.findById(taskID))
        }
        for(let taskID of tasklist.scheduledTasks) {
            tasks.reminders.scheduledTasks.push(await Task.findById(taskID))
        }
    }

    return res.status(200).json( {
        tasks: tasks
    })
}

module.exports = {
    createTasklist,
    getTasklistWithID,
    getTasksFromTasklistWithID
}