import {writeFile, readFile} from "fs"
import {promisify} from "util"
import {Note} from "./Note"

const write = promisify(writeFile)
const read = promisify(readFile)

export class Notes {
    constructor(fileName) {
        this.notes = []
        this.fileName = fileName
        this.load()
    }

    load() {
        read(this.fileName, 'utf8')
            .then(data => JSON.parse(data))
            .then(notesList => notesList
                .forEach(note => this.add(new Note(note))))
    }

    getAll() {
        return this.notes
    }

    getById(id) {
        if (!this.notes[id - 1]) throw Error(`Cannot find a note with ${id}`)
        return this.notes[id - 1]
    }

    add(note) {
        if (!note instanceof (Note))
            throw new Error('note is not instance of Note class')
        this.notes.push(note)
    }

    save() {
        write(this.fileName, JSON.stringify(this.notes, null, "\t"), "utf8")
    }

    edit(id, note_partial) {
        if (!this.notes[id - 1]) throw Error(`Cannot find a note with ${id}`)
        this.notes[id - 1] = {...this.notes[id - 1], ...note_partial}
        return this.notes
    }

    delete(id) {
        if (!this.notes[id - 1]) throw Error(`Cannot find a note with ${id}`)
        this.notes.splice(id - 1, 1)
        return this.notes
    }
}
