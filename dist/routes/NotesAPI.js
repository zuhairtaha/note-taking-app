"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notesApiRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _NotesAPI = require("../controllers/NotesAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notesApiRouter = _express.default.Router();

exports.notesApiRouter = notesApiRouter;
notesApiRouter.get('/', _NotesAPI.NotesAPI.getAllNotes).get('/:id', _NotesAPI.NotesAPI.getNoteById).post('/', _NotesAPI.NotesAPI.addNote).patch('/:id', _NotesAPI.NotesAPI.editNoteById).delete('/:id', _NotesAPI.NotesAPI.deleteNoteById); //export default notesApiRouter