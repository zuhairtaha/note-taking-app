"use strict";

var _express = _interopRequireDefault(require("express"));

var _Notes = _interopRequireDefault(require("./routes/Notes"));

var _TagsAPI = _interopRequireDefault(require("./routes/TagsAPI"));

var _NotesAPI = require("./routes/NotesAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {} from 'dotenv/config'
var port = process.env.PORT;
var app = (0, _express.default)();
app.set('view engine', 'ejs'); // npm i ejs

app.use("/public", _express.default.static(__dirname + '/../public'));
app.use(_express.default.json()); //Built-in Middleware (instead of body-parser)

app.use(_express.default.urlencoded()); //html form : key=value&key=vale

app.use('/', _Notes.default);
app.use('/api/tags', _TagsAPI.default);
app.use('/api/notes', _NotesAPI.notesApiRouter);
app.listen(port, function () {
  return console.log("listening on ".concat(port));
});