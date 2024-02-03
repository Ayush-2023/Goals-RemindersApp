const { mongoose } = require("../database/configs/connect")
const { User } = require("../database/models/user/user")
const { Tasklist } = require("../database/models/task-list/task-list")
const { Reminder } = require("../database/models/task-list/reminder")
const { Goal } = require("../database/models/task-list/goal")

const userAuthentication = async (req, res, next) => {

}

const createUser = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400).json({
            error: "Bad Request, Username is required"
        })
    }

    try {
        const newUser = User({
            name: name
        })
        await newUser.save()
        res.status(201).json({
            id: newUser.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Server unable to process request",
        })
    }
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

    res.status(200).json( {
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

    res.status(200).json( {
        goals
    })
}

const getRemindersForUserWithID = async (req, res) => {
    const user = req.body.user
    console.log(user)
    let reminders = []

    for(let tasklistID of user.tasklists) {
        const tasklist = Reminder.findById( tasklistID)
        if(tasklist) {
            reminders.push( await tasklist)
        }
    }

    res.status(200).json( {
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