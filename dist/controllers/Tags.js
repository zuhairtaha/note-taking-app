"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tags = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs");

var util = require('util');

var writeFile = util.promisify(fs.writeFile);
var readFile = util.promisify(fs.readFile);

var Tags =
/*#__PURE__*/
function () {
  function Tags() {
    _classCallCheck(this, Tags);
  }

  _createClass(Tags, null, [{
    key: "home",
    value: function home(req, res) {
      readFile("tags.json", 'utf8').then(function (data) {
        return JSON.parse(data);
      }).then(function (tags) {
        return res.send(tags);
      });
    }
  }]);

  return Tags;
}();

exports.Tags = Tags;