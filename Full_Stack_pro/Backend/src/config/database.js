const mongoose = require('mongoose');

const connectDB = async () => {
try{
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("database connected")
} catch{
    console.log("error in connection")
}
}

module.exports=connectDB