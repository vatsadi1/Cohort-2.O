const express = require("express")
const app = express()
app.use(express.json())
 const authRouter = require("./router/user.roter.js")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
 app.use("/api/auth",authRouter)
module.exports=app

