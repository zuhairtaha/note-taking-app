import express from 'express'
import {Notes as notes} from '../controllers/Notes'

const notesRouter = express.Router()

notesRouter.get('/', notes.home)

export default notesRouter