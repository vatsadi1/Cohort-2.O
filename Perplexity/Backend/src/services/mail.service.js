import nodemailer from "nodemailer";

const transpoter =  nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN
    }
})

transpoter.verify()
.then(()=>{console.log("email transpoter is ready to send email")})
.catch((err)=>{console.error("transpopter get err :",err)})

export async function sendEmail({to,subject,text,html}) {
    const mailOptions = {
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }
    const details = await transpoter.sendMail(mailOptions)
    console.log("email send details :",details)
}