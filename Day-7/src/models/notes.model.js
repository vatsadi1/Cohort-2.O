const { default: mongoose } = require('mongoose');

// Schema is use to describe formate in which daṭā store

const noteSchema = new mongoose.Schema({
    title:String,
    description:String
})


// Models is used to perform operation on the database -- without it no opretion can be performed 
const noteModel = mongoose.model("notes", noteSchema)

// notes = collectionName 


module.exports = noteModel;