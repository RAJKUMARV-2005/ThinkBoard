import Notes from "../models//Note.js";
export async function getAllNotes(req,res){
    try {
        const note= await Notes.find().sort({createdAt:-1});
        res.status(200).json(note);
        
    } catch (error) {
        console.error("Error in fetching getAllNotes Controller"+error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function createNote(req,res){
    try {
        const {title,content}=req.body;
        const newNote=new Notes({title,content})
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error in creating createNote Controller"+error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function updateNote(req,res){
    try {
        const {title,content}=req.body;
        
        const updatednote=await Notes.findByIdAndUpdate(req.params.id,{title,content})
        if(!updatednote){
            return res.status(404).json({message:"Note Not found"});
        }

        res.status(201).json({message:"Note updated succesfully"});
    } catch (error) {
        console.error("Error in updating.. visit Note updateNote controller"+error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteNote(req,res){
    try { 
        const deletetdnote=await Notes.findByIdAndDelete(req.params.id)
        if(!deletetdnote){
            return res.status(404).json({message:"Note Not found"});
        }

        res.status(201).json({message:"Note Deleted succesfully"});
    } catch (error) {
        console.error("Error in Deleting.. visit Note deleteNote controller"+error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export async function getSpecificNote(req,res) {
    try {
        const note= await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note Not found"});
        }
        res.status(200).json(note);
        
    } catch (error) {
        console.error("Error in  fetching specific Notes..visit getSpecificNote controller"+error);
        res.status(500).json({message:"Internal Server Error"})
        
    }
}
