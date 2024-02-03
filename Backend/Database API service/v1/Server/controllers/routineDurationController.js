const { mongoose } = require("../database/configs/connect")
const { RoutineDuration } = require("../database/models/task/routine_duration/routineDuration")
const { MonthlyDuration } = require("../database/models/task/routine_duration/monthlyDuration")
const { PeriodicDuration } = require("../database/models/task/routine_duration/periodicDuration")
const { WeeklyDuration } = require("../database/models/task/routine_duration/weeklyDuration")
const { YearlyDuration } = require("../database/models/task/routine_duration/yearlyDuration")
const { Tasklist } = require("../database/models/task-list/task-list")
const { User } = require("../database/models/user/user")
const { Task } = require("../database/models/task/task")

const createRoutineDuration = async (req, res) => {
    const { userID, tasklistID, taskID} = req.body
    
    if( !mongoose.Types.ObjectId.isValid(taskID) || !mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(tasklistID)) {
        res.status(400).json( {
            error: "Bad Request, Provide valid ids for task, tasklist, user"
        })
        return 
    }

    const user = await User.findById(userID)

    if (!user || !user.tasklists.find(objectID => objectID.equals(new mongoose.Types.ObjectId(tasklistID)))) {
        res.status(403).json({
            error: "Forbidden"
        })
        return 
    }

    const tasklist = await Tasklist.findById(tasklistID)

    if(!tasklist || tasklist.category !== "Reminder") {
        res.status(400).json( {
            error: "Bad Request, Could not find tasklist with given task"
        })
        return 
    }

    const task = await Task.findById(taskID)

    if(!task) {
        res.status(404).json( {
            error: "Could not find task with gven ID"
        })
        return
    }
}