require("dotenv").config()
const express = require("express")
const app = require("./src/app.js")
const DbConnect = require("./src/config/DataBaseConn.js")
 
const PORT = process.env.PORT || 3000
async function serverStart() {
    try{
        // monngodb connection
await DbConnect()
        const server = app.listen(PORT,()=>{
        console.log("Server is Running on Port:",PORT)
        })
        server.on("err",(err)=>{
console.log(err)
process.exit(1)
        })

    }catch(err){
console.log("Failed to start servr",err)
process.exit(1)
    }
    
}

serverStart()