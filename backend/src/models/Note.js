import mongoose  from "mongoose";
 
//1.create a Schema
//2.create a model based on that schema
///3.export that model

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
},{
    timestamps:true
});

const Note=mongoose.model("Note",noteSchema)

export default Note;