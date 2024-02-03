const app = require("express")()
require("dotenv").config()
require("./database/configs/connect")
const port = process.env.port

const { userRouter } = require("./routes/userRoutes")
const { tasklistRouter } = require("./routes/tasklistRoutes")
const { taskRouter } = require("./routes/taskRoutes")
const { setResponseType } = require("./middlewares/apiServiceMiddleware")

app.use("/api/user", setResponseType, userRouter)
app.use("/api/tasklist", setResponseType, tasklistRouter)
app.use("/api/task", setResponseType, taskRouter)

app.use( (req, res) => {
    res.type = "json"
    res.status(404).json( {
        error: "Service Not Found"
    })
})

app.listen( port, () => {
    console.log("Server started, listening at port " + port)
})