import express from "express";
import { createNote, deleteNote, getAllNotes, getSpecificNote, updateNote } from "../controller/notesController.js";

const router=express.Router();

router.get("/",getAllNotes);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
router.get("/:id",getSpecificNote);


export default router;