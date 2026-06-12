const express = require("express")
const {
    userRegister,
    userLogin,
    getMeController
} = require("../controller/auth.Controller")
const authRouter = express.Router()
const IdentifyUser = require("../middleware/auth.middleware");


/**
 * POST /api/auth/register
 */

authRouter.post("/register", userRegister)

/**
 * POST /api/auth/login
 */

authRouter.post("/login", userLogin)

 /**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me", IdentifyUser,getMeController)

module.exports = authRouter