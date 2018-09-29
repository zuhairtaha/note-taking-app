"use strict";

var _renderNotes = require("./renderNotes");

var _renderTags = require("./renderTags");

var M = _interopRequireWildcard(require("../libs/materialize_1.0/js/bin/materialize"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

M.AutoInit();
(0, _renderNotes.renderNotesPromise)().then(function (notes) {
  notes.querySelectorAll('.view-note-button').forEach(renderOneNote);
  notes.querySelectorAll('.delete-note-button').forEach(deleteOneNote);
  notes.querySelectorAll('.edit-note-button').forEach(editOneNote);
}).catch(function (err) {
  return console.log(err);
}); // --------------------------

/**
 * when view note button click, show note in the modal
 * @param {Element} button
 */

function renderOneNote(button) {
  // modal element content
  var noteDiv = document.querySelector('#note-view-modal-content');
  button.addEventListener('click', function () {
    var noteId = parseInt(this.parentNode.dataset.index) + 1;
    fetch("/api/notes/".concat(noteId)).then(function (data) {
      return data.json();
    }).then(function (note) {
      // get note tags using tags promise
      _renderNotes.tagsPromise.then(function (allTags) {
        var noteTags = (0, _renderNotes.getNoteTags)(note.tags, allTags); // render results

        noteDiv.innerHTML = "\n                            <h4>".concat(note.title, "</h4>\n                            <p>").concat(note.content, "</p>\n                            <p class=\"left\">").concat(noteTags, "</p>\n                            ");
      });
    });
  });
} // --------------------------

/**
 * delete a note when click on delete button, remove element and delete using restful api
 * @param {Element} button
 */


function deleteOneNote(button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    button.parentNode.parentNode.remove();
    var noteId = parseInt(this.parentNode.dataset.index) + 1;
    fetch("/api/notes/".concat(noteId), {
      method: 'delete'
    }).catch(function (err) {
      return alert(err);
    });
  });
} // --------------------------


(0, _renderTags.renderTagsPromise)().then(function () {
  document.querySelector('#submit-new-note').addEventListener('click', saveNote);
}).catch(function (err) {
  return console.log(err);
}); // --------------------------

/**
 * save a note to json file
 */

function saveNote() {
  var tags = [];
  document.querySelectorAll('#tags-row-add input[name="selectedTags"]:checked').forEach(function (checkbox) {
    tags.push(checkbox.value);
  });
  var note = {
    title: document.querySelector('#note-title').value,
    content: document.querySelector('#note-content').value,
    tags: tags.join(',')
  };

  try {
    ['title', 'content', 'tags'].forEach(function (key) {
      if (note[key].trim().length === 0) throw new Error("".concat(key, " must not be empty"));
    });
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(function () {
      closeModal('#add-note-modal');
      window.location = '/';
    }).catch(function (err) {
      return alert(err);
    });
  } catch (error) {
    alert(error);
  }
} // --------------------------


function editOneNote(button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    var id = parseInt(this.parentNode.dataset.index) + 1;
    var titleInput = document.querySelector('#note-title-edit');
    var contentInput = document.querySelector('#note-content-edit');
    var tagsInput = document.querySelector('#tags-row-edit');
    document.querySelector('#edit-note-button').setAttribute('data-carid', id);
    fetch("/api/notes/".concat(id)).then(function (data) {
      return data.json();
    }).then(function (note) {
      titleInput.value = note.title;
      contentInput.value = note.content;
      M.updateTextFields();
      enableCheckBoxes(note.tags.split(','));
      openModal('#edit-note-modal');
    }).catch(function (err) {
      return alert(err);
    });
  });
} // --------------------------


function enableCheckBoxes(valuesArray) {
  document.querySelectorAll("#tags-row-edit  input[name='selectedTags']").forEach(function (checkbox) {
    checkbox.checked = !!valuesArray.includes(checkbox.value);
  });
} // --------------------------


function closeModal(modalSelector) {
  var addNoteModal = document.querySelector(modalSelector);
  var instance = M.Modal.getInstance(addNoteModal);
  instance.close();
} // --------------------------


function openModal(modalSelector) {
  var addNoteModal = document.querySelector(modalSelector);
  var instance = M.Modal.getInstance(addNoteModal);
  instance.open();
} // --------------------------

/**
 * update a note to json file
 */


document.querySelector('#edit-note-button').addEventListener('click', function () {
  var tags = [];
  document.querySelectorAll('#tags-row-edit input[name="selectedTags"]:checked').forEach(function (checkbox) {
    tags.push(checkbox.value);
  });
  var note = {
    title: document.querySelector('#note-title-edit').value,
    content: document.querySelector('#note-content-edit').value,
    tags: tags.join(',')
  };

  try {
    ['title', 'content', 'tags'].forEach(function (key) {
      if (note[key].trim().length === 0) throw new Error("".concat(key, " must not be empty"));
    });
    var id = this.dataset.carid;
    fetch("/api/notes/".concat(id), {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(function () {
      closeModal('#edit-note-modal');
      window.location = '/';
    }).catch(function (err) {
      return alert(err);
    });
  } catch (error) {
    alert(error);
  }
});