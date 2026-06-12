const express = require('express');
const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken')
const crypto =require("crypto")
const authRouter = express.Router()

// Post --> /api/auth/register
// /api/auth --> this is only prefix use to hit the api before original endpoint 

authRouter.post("/register", async (req, res) => {
    const {
        email,
        name,
        password
    } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "user already exist"
        })
    }
 const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email,
        name,
        password:hash
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user created",
        user,
        token
    })
})


// Post --> /api/auth/protected
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies)
    res.status(200).json({
        message: "This is Protected route "
    })
})

// POSt --> /api/auth/login

// aesea function jo sirf api p request aane pr execute ho usk hm bolte hai --> Controller 


authRouter.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(404).json({
            message: "USer Not registerd"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatch) {
        return res.status(404).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt-token", token)

    res.status(200).json({
        message: "User Looged in",
        user
    })
})


module.exports = authRouter