"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notes = void 0;

var _fs = require("fs");

var _util = require("util");

var _Note = require("./Note");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var write = (0, _util.promisify)(_fs.writeFile);
var read = (0, _util.promisify)(_fs.readFile);

var Notes =
/*#__PURE__*/
function () {
  function Notes(fileName) {
    _classCallCheck(this, Notes);

    this.notes = [];
    this.fileName = fileName;
    this.load();
  }

  _createClass(Notes, [{
    key: "load",
    value: function load() {
      var _this = this;

      read(this.fileName, 'utf8').then(function (data) {
        return JSON.parse(data);
      }).then(function (notesList) {
        return notesList.forEach(function (note) {
          return _this.add(new _Note.Note(note));
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.notes;
    }
  }, {
    key: "getById",
    value: function getById(id) {
      if (!this.notes[id - 1]) throw Error("Cannot find a note with ".concat(id));
      return this.notes[id - 1];
    }
  }, {
    key: "add",
    value: function add(note) {
      if (!note instanceof _Note.Note) throw new Error('note is not instance of Note class');
      this.notes.push(note);
    }
  }, {
    key: "save",
    value: function save() {
      write(this.fileName, JSON.stringify(this.notes, null, "\t"), "utf8");
    }
  }, {
    key: "edit",
    value: function edit(id, note_partial) {
      if (!this.notes[id - 1]) throw Error("Cannot find a note with ".concat(id));
      this.notes[id - 1] = _objectSpread({}, this.notes[id - 1], note_partial);
      return this.notes;
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      if (!this.notes[id - 1]) throw Error("Cannot find a note with ".concat(id));
      this.notes.splice(id - 1, 1);
      return this.notes;
    }
  }]);

  return Notes;
}();

exports.Notes = Notes;