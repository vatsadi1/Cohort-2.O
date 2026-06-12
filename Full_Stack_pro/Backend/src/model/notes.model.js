const mongoose = require('mongoose');

 const noteschema = new mongoose.Schema({
    title:String,
    description:String
 })


 const notesModel = mongoose.model("notes", noteschema)

 module.exports = notesModel