
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken")
 

const registerUser = async(req,res)=>{
    const {email,password,name} = req.body

    const isUserAlredyExist= await userModel.findOne({email})

    if(isUserAlredyExist){
        return res.status(409).json({
            message:"user already exist"
        })
    }
      // 1. Salt generate
    const salt = await bcrypt.genSalt(10);

 // 2. hash Password
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await userModel.create({
        email,name,password:hashedPassword
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("jwt-token",token)
    console.log(req.cookies)

    res.status(200).json({
        message:"user creted succesfully",
        user,
        token
    })
    // ShortCut 
//const hashedPassword = await bcrypt.hash(password, 10);
}


const loginUser = async(req,res)=>{
  const {email,password} = req.body

const user = await userModel.findOne({email})

if(!user){
    return res.status(404).json({
        message:"user not registederd"
    })

}

    // Compare Password 
 const ispasswordmatch= await bcrypt.compare(password , user.password)


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
}

const logout = async(req,res)=>{
    res.clearCookie("jwt-token",{path:"/"})
    res.status(200).json({
        message:"logout"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logout
}