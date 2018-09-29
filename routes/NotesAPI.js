import express from 'express'
import {NotesAPI as notes} from '../controllers/NotesAPI'

export const notesApiRouter = express.Router()

notesApiRouter
    .get('/', notes.getAllNotes)
    .get('/:id', notes.getNoteById)
    .post('/', notes.addNote)
    .patch('/:id', notes.editNoteById)
    .delete('/:id', notes.deleteNoteById)
//export default notesApiRouter