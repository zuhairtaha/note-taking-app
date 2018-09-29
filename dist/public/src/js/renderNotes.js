"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNotesPromise = renderNotesPromise;
exports.getNoteTags = getNoteTags;
exports.tagsPromise = void 0;
// ============ promises =================
// note promise
var notesPromise = new Promise(function (resolve) {
  fetch('/api/notes').then(function (data) {
    return data.json();
  }).then(function (notes) {
    return resolve(notes);
  });
}); // tags promise

var tagsPromise = new Promise(function (resolve) {
  fetch('/api/tags').then(function (data) {
    return data.json();
  }).then(function (tags) {
    return resolve(tags);
  });
}); // handle all promises

exports.tagsPromise = tagsPromise;

function renderNotesPromise() {
  return Promise.all([notesPromise, tagsPromise]).then(function (data) {
    return renderNotes(data[0], data[1]);
  });
} // --------------------------

/**
 * get tags for a note
 * @param {Array} tagsArray
 * @param {Array} allTags
 * @returns {string}
 */


function getNoteTags(tagsArray, allTags) {
  return allTags.filter(function (tag) {
    return tagsArray.includes(tag.id);
  }).map(function (tag) {
    return "<span class=\"badge grey lighten-3 tag-span\">\n                        <i class=\"material-icons tiny\">local_offer</i>\n                        ".concat(tag.tag, "\n                      </span>");
  }).join(" ");
} // --------------------------

/**
 * render all notes
 * @param {Array}notes
 * @param {Array} tags
 */


function renderNotes(notes, tags) {
  var notesTbodyContent = '';
  notes.forEach(function (note, index) {
    notesTbodyContent += "\n            <tr>\n                <td>".concat(index + 1, "</td>\n                <td>").concat(note.title, "</td>\n                <td>").concat(getNoteTags(note.tags, tags), "</td>\n                <td data-index=\"").concat(index, "\" class=\"control-buttons\">\n                \n                    <a class=\"btn red delete-note-button\">\n                        <i class=\"material-icons\">delete</i>\n                    </a>\n                    \n                    <a class=\"btn orange edit-note-button\">\n                        <i class=\"material-icons\">mode_edit</i>\n                    </a>\n                    \n                    <a class=\"btn blue modal-trigger view-note-button\" \n                        href=\"#view-note-modal\">\n                        <i class=\"material-icons\">remove_red_eye</i>\n                    </a>\n                    \n                </td>\n            </tr>\n        ");
  });
  var notesTbody = document.querySelector('#notes-tbody');
  notesTbody.innerHTML = notesTbodyContent;
  return notesTbody;
}