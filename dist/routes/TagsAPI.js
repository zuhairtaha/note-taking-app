"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Tags = require("../controllers/Tags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notesRouter = _express.default.Router();

notesRouter.get('/', _Tags.Tags.home);
var _default = notesRouter;
exports.default = _default;