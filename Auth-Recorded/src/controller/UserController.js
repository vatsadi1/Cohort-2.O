const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../model/user.model")

const userRegister = async(req,res)=>{

// Steps --> req.body se data lo
// email check kro agr already hai to return 
// password hash kro 
// user creat kro
// token banno
// cookies me set kro 

const {name,email,password} = req.body
console.log(req.body)

const emailAlreadyExist = await UserModel.findOne({email})

if(emailAlreadyExist){
    return res.status(409).json({
        message:"User Already exist"
    })
}

// Password hash using bcrypt
console.log("Password before hash",password)
// step 1 --> salt

const salt = await bcrypt.genSalt(10)
console.log("Salt is",salt)
//step 2--> hash

const hashpassword = await bcrypt.hash(password,salt)
console.log("Password after hash",hashpassword)

const user = await UserModel.create({
    name,
    email,
    password:hashpassword,
})
const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1hr"})

res.cookie("token",token)
console.log(req.cookies)

res.status(200).json({
    message:"user CReated Succesfully",
    user,
    token
})
}

// post--> /login

const loginUser = async (req,res) =>{
    const {email,password} = req.body

    const user = await UserModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const ispasswordMatch = await bcrypt.compare(password , user.password)

    if(!ispasswordMatch){
        return res.status(404).json({
message:"INvalid password"
        }
        )
    }
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1hrs"})

res.cookie("token",token)


res.status(200).json({
    message:"user Logined Successfully",
    user
})
}



const getMe = async (req,res) =>{

const token = req.cookies.token

const decode = jwt.verify(token,process.env.JWT_SECRET)

const user = await UserModel.findById(decode.id)

res.json({
name:user.name,
email:user.email
})

}

const logout = async(req,res)=>{
    res.clearCookie("token",{path:"/"})
    res.status(200).json({
        message:"logout"
    })
}

module.exports = {userRegister,loginUser,getMe,logout}