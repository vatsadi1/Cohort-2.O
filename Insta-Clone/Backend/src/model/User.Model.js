const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username Already Exist"],
        required: [true, "Username is Required"]
    },
    email: {
        type: String,
        unique: [true, "Email already registerd "],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "PAssword is required"],
        select: false
    },
    bio: String,
    profile_image: {
        type: String,
        default: "https://ik.imagekit.io/folpeune6/Insta-clone/Default_pfp.jpg"
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel