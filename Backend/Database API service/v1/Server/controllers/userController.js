const { mongoose } = require("../database/configs/connect")
const { User } = require("../database/models/user/user")
const { Tasklist } = require("../database/models/task-list/task-list")
const { Reminder } = require("../database/models/task-list/reminder")
const { Goal } = require("../database/models/task-list/goal")

const saveUser = async (newUser) => {
    try {
        await newUser.save()
        return res.status(201).json({
            id: newUser.id
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Server unable to process request",
        })
    }
}

const createUser = async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({
            error: "Bad Request, Username is required"
        })
    }

    saveUser( new User( {
        name: name
    }))
}

const getUserForID = async (req, res) => {
    const user = req.body.user

    res.status(200).json({
        user: user
    })
}

const getTasklistsForUserWithID = async (req, res) => {
    const user = req.body.user

    let tasklists = []

    for(let tasklistID of user.tasklists) {
        tasklists.push( await Tasklist.findById(tasklistID))
    }

    return res.status(200).json( {
        tasklists: tasklists
    })
}

const getGoalsForUserWithID = async (req, res) => {
    const user = req.body.user

    let goals = []

    for(let tasklistID of user.tasklists) {
        const tasklist = Goal.findById( tasklistID)
        if(tasklist.count > 0) {
            goals.push( await tasklist)
        }
    }

    return res.status(200).json( {
        goals
    })
}

const getRemindersForUserWithID = async (req, res) => {
    const user = req.body.user

    let reminders = []

    for(let tasklistID of user.tasklists) {
        const tasklist = Reminder.findById( tasklistID)
        if(tasklist) {
            reminders.push( await tasklist)
        }
    }

    return res.status(200).json( {
        reminders
    })
}

module.exports = {
    createUser,
    getUserForID,
    getTasklistsForUserWithID,
    getGoalsForUserWithID,
    getRemindersForUserWithID
}