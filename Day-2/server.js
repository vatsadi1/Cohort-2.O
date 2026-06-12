
// create the server using express
const express = require('express');  // use require because there are many servers run on this no need to import new server

const app = express()  // server instance create krna

const port = 3000

app.get('/',(req,res)=>{    // by using this we send res to the server on the '/' endpoint
    res.send("hello in express world")
})

// trying to send responsd to other endpoint like /adout

app.get('/about',(req,res)=>{
    res.send("About endpoint is requested so this is the response : I am here to master the Backend")
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})  // server started at port 3000 

// Q --> kya server request send kar skta hai
// ans --> yes using WebSocket.io

