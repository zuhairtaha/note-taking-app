import express from "express"
import notesRouter from "./routes/Notes"
import tagsApiRouter from "./routes/TagsAPI"
import {notesApiRouter} from "./routes/NotesAPI"
import {} from 'dotenv/config'

const port = process.env.PORT

const app = express()

app.set('view engine', 'ejs') // npm i ejs

app.use("/public", express.static(__dirname + '/public'))

app.use(express.json()) //Built-in Middleware (instead of body-parser)
app.use(express.urlencoded()) //html form : key=value&key=vale
app.use('/', notesRouter)
app.use('/api/tags', tagsApiRouter)
app.use('/api/notes', notesApiRouter)

app.listen(port, () => console.log(`listening on ${port}`))