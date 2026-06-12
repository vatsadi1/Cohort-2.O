const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const UserRouter = require("./router/user.router")
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",UserRouter)
module.exports=app