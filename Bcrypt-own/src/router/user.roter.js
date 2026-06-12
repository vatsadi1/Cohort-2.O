const express = require("express")
const { registerUser, loginUser, logout } = require("../controller/auth.controller")
const authRouter = express.Router()
 
// steps-> post method bano authRouter se 
// req.body se info nikaalo
// email already register check agr ho to return 
// nahi to password hash krlo 
// new user crete kro with this.name,email.hash passwird ke saath 
// token banno with user data only take id:user_id
// toke ko cookies me set kro 
// res do user crete ho gaya 

authRouter.post("/register",registerUser)
   
  

// Post --> /login

// steps-> email,password req.bosy se nikallo 
// check email exits krta hai n nahi krta to return invalid user
// agr email hai to password check kro sahi hai 
// agr dono sahi hai to jwt sign kro matlab token banno 
// token ko cookies me set kro 
// response send kro user login in

authRouter.post("/login",loginUser)
 

// post ---> /logout 
//  step--> clearcookies and gives the oath to the "/"

authRouter.post("/logout",logout)

 

module.exports = authRouter