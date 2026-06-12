import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { validate } from "../middleware/validation.middleware.js"
import { register } from "../controller/auth.controller.js";

const authRouter = Router();

/**
 * @route post/api/register
 * @desc register a new user
 * @access Public
 * @body {username,email,password}
 * 
 */


authRouter.post("/register",registerValidator,validate,register)


export default authRouter;