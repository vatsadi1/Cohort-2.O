const express = require("express")
const userModel = require("../model/userModel")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const { mongo, default: mongoose } = require("mongoose")
const { path } = require("../app")
// steps-> post method bano authRouter se 
// req.body se info nikaalo
// email already register check agr ho to return 
// nahi to password hash krlo 
// new user crete kro with this.name,email.hash passwird ke saath 
// token banno with user data only take id:user_id
// toke ko cookies me set kro 
// res do user crete ho gaya 

authRouter.post("/register",async(req,res)=>{
    const {email,password,name}= req.body

    const isUserAlredyExist= await userModel.findOne({email})

    if(isUserAlredyExist){
        return res.status(409).json({
            message:"user already exist"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email,name,password:hash
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("jwt-token",token)
    console.log(req.cookies)

    res.status(200).json({
        message:"user creted succesfully",
        user,
        token
    })
})

// Post --> /login

// steps-> email,password req.bosy se nikallo 
// check email exits krta hai n nahi krta to return invalid user
// agr email hai to password check kro sahi hai 
// agr dono sahi hai to jwt sign kro matlab token banno 
// token ko cookies me set kro 
// response send kro user login in

authRouter.post("/login",async(req,res)=>{
const {email,password} = req.body

const user = await userModel.findOne({email})

if(!user){
    return res.status(404).json({
        message:"user not registederd"
    })

}
const ispasswordmatch = user.password === crypto.createHash("md5").update(password).digest("hex")

if(!ispasswordmatch){
    return res.status(404).json({
        message:"Invalid Password"
    })
}

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

res.cookie("jwt-token",token)


res.status(200).json({
    message:"user Logined Successfully",
    user
})
})

// post ---> /logout 
//  step--> clearcookies and gives the oath to the "/"

authRouter.post("/logout",(req,res)=>{
    res.clearCookie("jwt-token",{path:"/"})
    res.status(200).json({
        message:"logout"
    })
})

 

module.exports = authRouter