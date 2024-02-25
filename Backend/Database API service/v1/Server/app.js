const app = require("express")()
require("dotenv").config()
require("./database/configs/connect")
const port = process.env.port

const { userRouter } = require("./routes/userRoutes")
const { tasklistRouter } = require("./routes/tasklistRoutes")
const { taskRouter } = require("./routes/taskRoutes")
const { setResponseType } = require("./middlewares/apiServiceMiddleware")
const { forbiddenAccessErrorhandler } = require("./ErrorHandling/ForbiddenAccessError")
const { insufficientDataErrorHandler } = require("./ErrorHandling/InsufficientDataError")
const { unauthorizedErrorHandler } = require("./ErrorHandling/UnauthorizedError")
const { invalidDataErrorHandler } = require("./ErrorHandling/InvalidDataError")
const { internalServerErrorHandler } = require("./ErrorHandling/InternalServerError")

app.use("/api/user", setResponseType, userRouter)
app.use("/api/tasklist", setResponseType, tasklistRouter)
app.use("/api/task", setResponseType, taskRouter)

app.use( forbiddenAccessErrorhandler)
app.use( insufficientDataErrorHandler)
app.use( unauthorizedErrorHandler )
app.use( invalidDataErrorHandler)
app.use( internalServerErrorHandler)

app.use( (req, res) => {
    res.type = "json"
    res.status(404).json( {
        error: "Service Not Found"
    })
})

app.listen( port, () => {
    console.log("Server started, listening at port " + port)
})