"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Note = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Note =
/*#__PURE__*/
function () {
  function Note(obj) {
    _classCallCheck(this, Note);

    if (obj === null || _typeof(obj) !== "object") throw new Error('object is required for constructor ');
    this.title = obj.title;
    this.content = obj.content;
    this.tags = obj.tags;
  }

  _createClass(Note, null, [{
    key: "keysArray",
    get: function get() {
      return ['title', 'content', 'tags'];
    }
  }]);

  return Note;
}();

exports.Note = Note;