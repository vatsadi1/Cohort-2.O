const express = require("express")
const dbConnection = require("./config/dbConnection")
const noteModel = require("./model/notesModel")
const app = express()

app.use(express.json())
// db connection
dbConnection()

//post notes
app.post("/notes", async (req, res) => {
    const {
        title,
        description
    } = req.body

    const note = await noteModel.create({
        title,
        description
    })

    res.status(200).json({
            message: "notes created",
            notes: note
        }

    )

})

// get notes
app.get("/notes", async (req, res) => {
    const note = await noteModel.find()
    res.status(200).json({
        message: "notes fetched",
        notes: note
    })
})

// delete 

app.delete("/notes/:id", async (req, res) => {
    const noteId = req.params.id
    await noteModel.findByIdAndDelete(noteId)
    res.status(200).json({
        message: "notes deleted",
    })
})

// update 

app.put("/notes/:id",async(req,res)=>{
    const noteId= req.params.id;
const {title,description} = req.body;
 
    await noteModel.findByIdAndUpdate(noteId,{title,description})

    res.status(200).json({
        message:"update succesfully",
    })
})

 


module.exports = app