import express from 'express'
import {Tags as tags} from '../controllers/Tags'

const notesRouter = express.Router()

notesRouter.get('/', tags.home)

export default notesRouter