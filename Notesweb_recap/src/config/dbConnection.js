
const mongoose = require("mongoose")

async function dbConnection (){
    try{
await mongoose.connect(process.env.MONGO_URI)
console.log("database connected")
    }
    catch (error){
console.log(error.message)
    }
}

module.exports=dbConnection