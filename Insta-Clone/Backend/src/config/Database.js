const mongoose =require("mongoose")


const DbConection = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected")
}

module.exports = DbConection