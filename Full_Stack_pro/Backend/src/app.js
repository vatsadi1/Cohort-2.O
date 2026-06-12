const express = require('express');
const { model } = require('mongoose');
const notesModel = require('./model/notes.model');

const app = express();
const path = require("path")
app.use(express.json())
  
app.use(express.static("./public"))
const cors = require('cors')
app.use(cors())
// post notes 

app.post("/api/notes",async(req,res)=>{
    const {title , description} = req.body
if(title == "" || description == ""){
res.status(400).json({
    message:"No Data So notes not Created"
})
}
else{
    const note = await notesModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created successfully",
       notes: note
    })
}
})

// get notes 

app.get("/notes",async(req,res)=>{
    const note = await notesModel.find()

    res.status(200).json({
        message:"these are notes ",
notes:note
    })
})

// delete notes 

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
   await notesModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"notes deleted ",
        
       
    })
})

// update the notes using patch
// update the description --> req.body = {description}

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
 const {description } = req.body


await notesModel.findByIdAndUpdate(id,{description})

res.status(200).json({
    message:"description update"
})
})

  // update both 
 app.put("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
 const {title}= req.body
    const {description } = req.body
 
if(title == "" || description == ""){
res.status(400).json({
    message:"No updated Data Found"
})
}

await notesModel.findByIdAndUpdate(id,{description,title})

res.status(200).json({
    message:"description update"
})
})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})


module.exports = app;