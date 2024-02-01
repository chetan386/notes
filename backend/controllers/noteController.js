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

 const search  = req.query.search || "";
 const filter = req.query.filter || "";
 const sort = req.query.sort || "none";
  const query = {
    $or: [
        {"title": {$regex: new RegExp(search,"i")}},
        {"content": {$regex: new RegExp(search,"i")}},
        {"category": {$regex: new RegExp(search,"i")}}
    ]
  }

    

      if(filter!=="" && filter!=="All"){
       query.category = filter
    }
    
   
    try{
     
   const notes = await Note.find(query)
   .collation({ locale: 'en', strength: 2 }).sort({title: sort === "asc"?1 : -1})

   res.status (200).json({
    status:"success",
    notes
})


    }
    catch(err){
        res.status(401).json({
            status: "failed",
            message: "notes not found",
        })
    }

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
