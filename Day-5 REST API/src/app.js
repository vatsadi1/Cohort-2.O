 // this file is use to crete the server and configure the server
 
 const express = require("express")
 const app = express()  // server create ho jaata hai 

app.use(express.json()) // middleware to parse the json data from the request body

const notes = [
//     {
//     title:"title 1",
//     description:"description 1"
// }
]

app.post("/notes",(req,res)=>{

notes.push(req.body)
console.log(notes)
    res.send("notes created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

// /notes/:variable-name this is use to handle dynamic values
// : iske baad jo valuea aaega wo dynamic hoga or handle hoga variable jo : iske baad doge 



// Notes --> 1. Agr data complex ho jaese description or title to hm req.body ka use krte hai 
// 2. agr data single ho jaese userid or array index tb hm req.param ka use krte hai 


app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index)
   delete notes[req.params.index]
    res.send("notes deleted")
})

// patch / notes/:index
// req.body = {description :- "sample modified description"}

app.patch("/notes/:index",(req,res)=>{
   notes[req.params.index].description = req.body.description
    res.send("notes updated")
})

 module.exports = app