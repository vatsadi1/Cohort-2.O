// This file is use to start the server and listen to the port
 

const app = require("./src/app");

 
app.listen(3000,(req,res)=>{
    console.log("local host running 3000")
})