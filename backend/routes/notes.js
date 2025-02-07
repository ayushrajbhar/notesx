const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();


// ROUTE 1: Fetch all the notes of a user using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, async (req,res)=>{
    try {
        const {title, description, tag} = req.body

        // Creating a new note object
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        
        res.json(savedNote)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    try {
        const {title, description, tag} = req.body
    
        // Creating a new note object
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        // Finding the note to be updated
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not Found');
        }
    
        // Checking if the note belongs to the user updating it
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
    
        // Updating the note
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    try {
        
        // Finding the note to be deleted
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not Found');
        }
    
        // Checking if the note belongs to the user deleting it
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed');
        }
    
        // Deleting the note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "The note has been deleted", note: note})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router