"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotesAPI = void 0;

var _Notes = require("../models/Notes");

var _Note = require("../models/Note");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var myNotes = new _Notes.Notes("notes.json");

var NotesAPI =
/*#__PURE__*/
function () {
  function NotesAPI() {
    _classCallCheck(this, NotesAPI);
  }

  _createClass(NotesAPI, null, [{
    key: "getAllNotes",
    value: function getAllNotes(req, res) {
      var notesList = myNotes.getAll();

      _Note.Note.keysArray.forEach(function (key) {
        var queryKey = req.query[key];

        if (queryKey) {
          notesList = notesList.filter(function (note) {
            var regex = new RegExp("^".concat(queryKey), 'i');
            return regex.test(note[key]);
          });
        }
      });

      res.send(notesList);
    } // --------------------------------------------------

  }, {
    key: "getNoteById",
    value: function getNoteById(req, res) {
      try {
        res.send(myNotes.getById(req.params.id));
      } catch (error) {
        res.status(404).send("Error ".concat(error));
      }
    } // --------------------------------------------------

  }, {
    key: "editNoteById",
    value: function editNoteById(req, res) {
      try {
        myNotes.edit(req.params.id, req.body);
        myNotes.save();
        res.send(myNotes.getAll());
      } catch (error) {
        res.status(404).send("Error ".concat(error));
      }
    } // --------------------------------------------------

  }, {
    key: "addNote",
    value: function addNote(req, res) {
      try {
        var note = new _Note.Note(req.body);
        myNotes.add(note);
        myNotes.save();
        res.send(myNotes.getAll());
      } catch (error) {
        res.status(404).send(error);
      }
    } // --------------------------------------------------

  }, {
    key: "deleteNoteById",
    value: function deleteNoteById(req, res) {
      try {
        myNotes.delete(req.params.id);
        myNotes.save();
        res.send(myNotes.getAll());
      } catch (error) {
        res.status(404).end();
      }
    }
  }]);

  return NotesAPI;
}();

exports.NotesAPI = NotesAPI;