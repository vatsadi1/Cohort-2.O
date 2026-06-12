import userModel from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { sendEmail } from "../services/mail.service.js";

export async function register(req,res) {

    const {username,email,password} = req.body

    const alreadyregister = await userModel.findOne({
        $or:[{email},{username}]
    })

    if(alreadyregister){
        return res.status(409).json({
            success:false,
            meassage:"user already register",
            err:"User already exist"
        })
    }

    const user = await userModel.create({
        username:username,
        email:email,
        password:password
    })
  
    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
       text:`Welcome to Perplexity, ${username}! Thank you for registering with us. We're excited to have you on board and look forward to providing you with an amazing experience. If you have any questions or need assistance, feel free to reach out to our support team. Best regards, The Perplexity Team`,
        html:`<h1>Welcome to Perplexity, ${username}!</h1><p>Thank you for registering with us. We're excited to have you on board and look forward to providing you with an amazing experience.</p><p>If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br/>The Perplexity Team</p>`
    })
res.status(201).json({
    success:true,
    message:"user register successfully",
    user:{
        username:user.username,
        email:user.email
    }
})

}
