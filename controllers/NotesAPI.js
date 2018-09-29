import {Notes} from "../models/Notes"
import {Note} from "../models/Note"

const myNotes = new Notes("notes.json")
export class NotesAPI {
    static getAllNotes(req, res) {
        let notesList = myNotes.getAll()
        Note.keysArray.forEach(key => {
            const queryKey = req.query[key]
            if (queryKey) {
                notesList = notesList.filter(note => {
                    const regex = new RegExp(`^${queryKey}`, 'i')
                    return regex.test(note[key])
                })
            }
        })
        res.send(notesList)
    }

    // --------------------------------------------------
    static getNoteById(req, res) {
        try {
            res.send(myNotes.getById(req.params.id))
        } catch (error) {
            res.status(404).send(`Error ${error}`)
        }
    }

    // --------------------------------------------------
    static editNoteById(req, res) {
        try {
            myNotes.edit(req.params.id, req.body)
            myNotes.save()
            res.send(myNotes.getAll())
        } catch (error) {
            res.status(404).send(`Error ${error}`)
        }
    }

    // --------------------------------------------------
    static addNote(req, res) {
        try {
            const note = new Note(req.body)
            myNotes.add(note)
            myNotes.save()
            res.send(myNotes.getAll())
        } catch (error) {
            res.status(404).send(error)
        }
    }

    // --------------------------------------------------
    static deleteNoteById(req, res) {
        try {
            myNotes.delete(req.params.id)
            myNotes.save()
            res.send(myNotes.getAll())
        } catch (error) {
            res.status(404).end()
        }
    }
}
