const express = require('express');

const app = express();

app.use(express.json())
const notes = []


// post the notes to sever
app.post("/notes",(req,res)=>{
     notes.push(req.body)
    res.status(201).json({
        message:"notes created successfully"
    })
})

// get the notes from server

app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes
    })
    console.log(notes)
})

// delete the notes using req.params

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    console.log(req.params.index)

    res.status(204).json({
        message:"notes deleted successfully"
    })
})

// update only description--> partily update use patch
// update the description that is selected by index with the description i send via req.body

app.patch("/notes/:index",(req,res)=>{
    notes [req.params.index].description = req.body.description
    res.send(notes)
})

// update using put 

app.put("/notes/:index",(req,res)=>{
notes [req.params.index]  = req.body
res.status(200).json({
    message:"note updated successfully"
})
})


module.exports = app