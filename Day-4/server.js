const express = require('express');
 

const app = express()

app.use(express.json())
const PORT = 3000

const notes = []

// user creted notes
app.post("/notes",(req,res)=>{
    
    notes.push(req.body)
    
    res.send("notes creted")

})
// notes is displayed

app.get("/notes",(req,res)=>{
    res.send(notes)
})

//notes delete option 
localStorage.setItem(notes)

app.listen(PORT,(req,res)=>{
    console.log(`server is running on local-host: ${PORT}`)
})