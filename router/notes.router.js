const express = require("express");
const app = express();
const mongoose = require("mongoose");
const NoteRouter = express.Router();
const { NotesModel } = require("../model/notes.model");

app.use(express.json());

NoteRouter.get("/", async(req,res)=>{
    const userid = req.body.userID;
    try{
        const data = await NotesModel.find({userID:userid});
        res.send(data);
    }catch(err){
        console.log(err);
        res.send({"Can't get":"Cannot get the data"});
    }
})

NoteRouter.post("/create", async(req,res)=>{
    const payload = req.body;
    try {
        const note = new NotesModel(payload);
        await note.save();
        res.send("Notes Created");
    } catch (error) {
        console.log(error);
        res.send("Can not create notes");
    }
})

NoteRouter.delete("/delete/:id", async(req,res)=>{
    const userid = req.body.userID;
    const data = await NotesModel.findOne({_id:req.params.id});
    const notesUser_id = data.userID;
    try {
        if(notesUser_id===userid){
            const note = await NotesModel.findByIdAndDelete({_id:req.params.id});
            res.send("Notes Deleted");
        }else{
            console.log("Not Authorized");
            res.send("Unauthorized can't delete");
        }
    } catch (error) {
        console.log(error);
        res.send("Can not delete notes");
    }
})

NoteRouter.patch("/edit/:id", async(req,res)=>{
    const userid = req.body.userID;
    const data = await NotesModel.findOne({_id:req.params.id});
    console.log(data)
    const notesUser_id = data.userID;
    try {
        if(notesUser_id===userid){
            const note = await NotesModel.findByIdAndUpdate(req.params.id, req.body);
            res.send("Notes Updated");
        }else{
            console.log("Not Authorized");
            res.send("Unauthorized can't update");
        }
    } catch (error) {
        console.log(error);
        res.send("Can not update notes");
    }
})

module.exports = { NoteRouter };