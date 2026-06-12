const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../model/User.Model")

const userRegister = async (req, res) => {
    const {
        username,
        email,
        password,
        bio,
        profile_image
    } = req.body

    const isuseralredyexist = await userModel.findOne({
        $or: [{
                username
            },
            {
                email
            }
        ]
    })

    if (isuseralredyexist) {
        return res.status(400).json({
            message: isuseralredyexist.username === username ?
                "Username already exists" :
                "Email already exists"
        })
    }

    const salt = await bcrypt.genSalt(10)

    const hashpassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
        username,
        email,
        password: hashpassword,
        bio,
        profile_image
    })
    
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1day"
    })

    res.cookie("token", token)

    res.status(200).json({
        message: "User Created SuccessFully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

const userLogin = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body

    const user = await userModel.findOne({
        $or: [{
                username
            },
            {
                email
            }

        ]
    }).select("+password") // password ko explicitly select krna padta hai kyuki humne user model me password ko select false kiya hua hai taki by default password na aaye query me
    if (!user) {
        return res.status(404).json({
            message: user.username !== username ? "Username not found" : "Email not found"
        })
    }

    const ispasswordmatch = await bcrypt.compare(password, user.password)

    if (!ispasswordmatch) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1day"
    })

    res.cookie("token", token)

    res.status(200).json({
        message: "Login SuccessFully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })

}

const getMeController = async (req,res) =>{
   const userId = req.user.id 

   const user = await userModel.findById(userId)

   res.status(200).json({
    message:"This is login user",
    user:{
username:user.username,
email:user.email,
bio:user.bio,
profileImage:user.profile_image
    }
   })
}

module.exports = {
    userRegister,
    userLogin,
    getMeController
}