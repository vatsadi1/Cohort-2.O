const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email Already Exist"]
    },
    password:String
})

const UserModel = mongoose.model("My-User",userSchema)

module.exports=UserModel