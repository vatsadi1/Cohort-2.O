const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
/**
 * require routes
 */
const authRouter = require("./routes/auth.routers.js");
const postRouter = require("./routes/post.router.js");
const userRouter = require("./routes/user.routers.js")
/* using Routes */
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/users", userRouter)


module.exports = app