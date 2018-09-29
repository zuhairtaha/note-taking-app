"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Notes = require("../controllers/Notes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notesRouter = _express.default.Router();

notesRouter.get('/', _Notes.Notes.home);
var _default = notesRouter;
exports.default = _default;