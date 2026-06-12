const express = require("express")
const {userRegister,loginUser,getMe,logout} = require("../controller/UserController.js")
 
const UserRouter = express.Router()

// Post --> /register
UserRouter.post("/register",userRegister)
 UserRouter.post("/login",loginUser)
 UserRouter.get("/get-me",getMe)
 UserRouter.post("/logout",logout)

module.exports=UserRouter