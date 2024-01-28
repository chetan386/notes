const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
   title: String,
   content :String,
   category: String
})


const Note = new mongoose.model("Note",noteSchema);


module.exports = Note



