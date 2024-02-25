const { mongoose } = require("../database/configs/connect")
const { Tasklist } = require("../database/models/task-list/task-list")
const { User } = require("../database/models/user/user")
const { Task } = require("../database/models/task/task")
const { GoalTask } = require("../database/models/task/goaltask")
const { ScheduledTask } = require("../database/models/task/scheduledtask")
const { RoutineDuration } = require("../database/models/task/routine_duration/routineDuration")
const { MonthlyDuration } = require("../database/models/task/routine_duration/monthlyDuration")
const { PeriodicDuration } = require("../database/models/task/routine_duration/periodicDuration")
const { WeeklyDuration } = require("../database/models/task/routine_duration/weeklyDuration")
const { YearlyDuration } = require("../database/models/task/routine_duration/yearlyDuration")
const { WeekDay } = require("../database/models/lookup/weekday")
const { Month } = require("../database/models/lookup/month")
const { RoutineTask } = require("../database/models/task/routinetask")
const { ResourceNotFoundError } = require("../ErrorHandling/ResourceNotFoundError")

const getTaskWithID = async (req, res) => {
    const { taskID } = req.params

    const task = await Task.findById(taskID)

    if(!task) {
        throw new ResourceNotFoundError("Resource Not Found: Cannot find Task with given ID")
    }

    return res.status(200).json( {
        task: task
    })     
}


const createGoalTask = (title) => {
    if(!title) {
        return undefined
    }

    return new GoalTask( {
        title: title,
        isComplete: false
    })
}

const createScheduledTask = (title, scheduledTime) => {
    if(!title || !scheduledTime) {
        return undefined
    }
    return new ScheduledTask( {
        title: title,
        scheduledTime: new Date(scheduledTime.year, scheduledTime.month, scheduledTime.date),
        isComplete: false
    })
}

const isValidPeriodicDuration = (days, noOfDays) => {
    if (noOfDays < 1 ) {
        return false
    }
    for(let day of days) {
        if((day < 1 ) || (day > noOfDays) ) {
            return false
        }
    }
    return true
}

const isValidMonthlyDuration = (days, noOfMonths) => {
    if (noOfMonths < 1 ) {
        return false
    }
    for(let day of days) {
        if((day < 1 ) || (day > 31) ) {
            return false
        }
    }
    return true
}

const createRoutineDuration = async (requestBody) => {
    const { durationType } = requestBody

    if(!durationType) {
        return undefined
    }

    if(durationType === "PeriodicDuration") {
        const { afterDays, noOfDays} = requestBody
        if(!isValidPeriodicDuration(afterDays, noOfDays)) {
            return undefined
        }
        return new PeriodicDuration( {
            afterDays: afterDays,
            noOfDays: noOfDays
        })
    }else if(durationType === "WeeklyDuration") {
        const {days, noOfWeeks } = requestBody
        if( noOfWeeks<1){
            return undefined
        }
        let weekDays = [] 
        for(let day of days) {
            const weekDay = await WeekDay.findOne( {
                name: day
            })
            if(!weekDay) {
                return undefined
            }
            weekDays.push( weekDay.id)
            console.log(weekDay.id)
        }
        return new WeeklyDuration({
            daysOfWeek: weekDays,
            noOfWeeks:  noOfWeeks 
        })
    } else if(durationType === "MonthlyDuration") {
        const { days, noOfMonths } = requestBody

        if(!isValidMonthlyDuration(days, noOfMonths)){
            return undefined
        }

        return new MonthlyDuration( {
            days: days,
            noOfMonths: noOfMonths
        })
    } else if(durationType === "YearlyDuration") {
        const { dates, noOfYears } = requestBody
        let yearDates = [] 
        for(let date of dates) {
            const month = await Month.find( {
                name: date.month
            })
            yearDates.push( {
                month: month,
                day: date.day
            })
        }
        return new YearlyDuration( {
            dates: yearDates,
            noOfYears: noOfYears
        })
    }else {
        return undefined
    }
}

const createRoutineTask = async (requestBody) => {
    const { title, startDate } = requestBody

    if (!title) {
        return undefined
    }

    const duration = await createRoutineDuration(requestBody)

    if(!duration){
        return undefined
    }

    await duration.save()
    return RoutineTask( {
        title: title,
        duration: duration.id,
        startDate: startDate
    })
}

async function saveNewTaskForTasklist(tasklist, task) {
    try {
        console.log(tasklist, task)
        await task.save()
        if (task.category === "GoalTask") {
            tasklist.goalTasks.push(task)
        }else if(task.category === "ScheduledTask") {
            tasklist.scheduledTasks.push(task)
        }else if(task.category === "RoutineTask") {
            tasklist.routineTasks.push(await task)
        }
        await tasklist.save()
    } catch (error) {
        throw new Error("Unable to save task to tasklist")
    }
}

const createTask = async (req, res) => {

    const { tasklist, title, category, scheduledTime } = req.body

    if(!category) {
        res.status(400).json({
            error: "Bad Request, cannot interpret task category"
        })
        return
    }

    const task = await ( async () => {
        if( tasklist.category === "Goal") {
            return createGoalTask(title)
        }else if(tasklist.category === "Reminder") {
            if( category === "ScheduledTask") {
                return createScheduledTask(title, scheduledTime)
            }else if(category === "RoutineTask" ){
                return await createRoutineTask(req.body)
            }
        }
    })()

    try {
        await saveNewTaskForTasklist(tasklist, task)
        res.status(201).json( {
            id: task.id
        })
    } catch (error) {
        res.status(500).json({
            error: "Server unable to process request",
        })
    }
    
}

module.exports = {
    getTaskWithID,
    createTask
}