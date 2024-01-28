const Note = require("../Models/noteModel")

exports.createNote = async(req,res) =>{
    const note = await Note.create(req.body)
    const notes = await Note.find()

    res.status(201).json({
        status:"success",
        notes
    })
}

exports.deleteNote = async(req,res)=>{
    const note = await Note.findById(req.params.id)
     
    if(!note){
        return res.status(404).json({
            status:"failed",
            message:"note not found"
        })
    }

    await note.deleteOne();
   const notes = await Note.find()

   res.status(200).json({
    status:"success",
    message:"note deleted successfully",
    notes,
   })
}



exports.getNotes = async(req,res) =>{
    const notes = await Note.find();

    if(!notes){
        return res.status(404).json({
            status: "failed",
            message: "notes not found",
        })
        }

        res.status (200).json({
            status:"success",
            notes
        })
}

exports.updateNote = async(req,res)=>{
     const note = await Note.findById(req.params.id);

     if(!note){
        return res.status(404).json({
            status: "failed",
            message: "note not found",
        })
     }

      await Note.findByIdAndUpdate(req.params.id, req.body)
      const updatedNote = await Note.findById(req.params.id)
      const notes = await Note.find()

     res.status(200).json({
        status: "success",
        notes
     })
}