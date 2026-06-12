const express = require('express');
const noteModel = require("./models/notes.model")
const app = express();

app.use(express.json())


// post Notes

 app.post("/notes",async (req,res)=>{
    const {title , description} = req.body

    const notes =   await noteModel.create({
        title , description
    })
    res.status(201).json({
        message:"Notes created successfully",
        notes
    })
 })

// get Notes

app.get("/notes",async (req,res)=>{
    const note = await noteModel.find()
    res.status(200).json({
message:"Notes fetched successfully",
note
    })
})


module.exports = app;