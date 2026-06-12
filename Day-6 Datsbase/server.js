const app = require("./src/app.js")
const mongoose = require("mongoose")
const PORT = 3000

function DatabaseConnection(){
mongoose.connect("mongodb+srv://adityababamahakal_db_user:Q7uJzXWDdq8e5teD@cluster1.m6efmhr.mongodb.net/day-6")
.then(()=>{
    console.log("Database connected ")
})
}

DatabaseConnection()



app.listen(PORT,(req,res)=>{
    console.log(`server is running at port ${PORT}`)
})