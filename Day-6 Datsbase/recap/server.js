const app = require("./src/app.js")
const mongoose = require("mongoose")
 


// Database connection

 async function ConnectToDatabase() {
    
   await  mongoose.connect("mongodb+srv://adityababamahakal_db_user:2zDzkRmG4dJHehPk@cluster1.9irfwg0.mongodb.net/")

      console.log("Database connected")
}  

ConnectToDatabase()

app.listen(3000,(req,res )=>{
    console.log("server is running at locathost 3000")
})
