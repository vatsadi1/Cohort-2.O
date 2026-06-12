const mongoose = require("mongoose")

 const DbConection = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connected Success")
 }

 module.exports=DbConection