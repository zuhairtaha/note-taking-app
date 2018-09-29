import {renderNotesPromise, tagsPromise, getNoteTags} from "./renderNotes"
import {renderTagsPromise} from "./renderTags"
import * as M from "../libs/materialize_1.0/js/bin/materialize"

M.AutoInit()

renderNotesPromise()
    .then(notes => {
        notes.querySelectorAll('.view-note-button').forEach(renderOneNote)
        notes.querySelectorAll('.delete-note-button').forEach(deleteOneNote)
        notes.querySelectorAll('.edit-note-button').forEach(editOneNote)
    })
    .catch(err => console.log(err))

// --------------------------
/**
 * when view note button click, show note in the modal
 * @param {Element} button
 */
function renderOneNote(button) {
    // modal element content
    const noteDiv = document.querySelector('#note-view-modal-content')
    button.addEventListener('click', function () {
        const noteId = parseInt(this.parentNode.dataset.index) + 1
        fetch(`/api/notes/${noteId}`)
            .then(data => data.json())
            .then(note => {
                // get note tags using tags promise
                tagsPromise
                    .then(allTags => {
                        const noteTags = getNoteTags(note.tags, allTags)
                        // render results
                        noteDiv.innerHTML = `
                            <h4>${note.title}</h4>
                            <p>${note.content}</p>
                            <p class="left">${noteTags}</p>
                            `
                    })

            })
    })
}

// --------------------------
/**
 * delete a note when click on delete button, remove element and delete using restful api
 * @param {Element} button
 */
function deleteOneNote(button) {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        button.parentNode.parentNode.remove()
        const noteId = parseInt(this.parentNode.dataset.index) + 1

        fetch(`/api/notes/${noteId}`, {
            method: 'delete'
        })
            .catch(err => alert(err))
    })
}

// --------------------------
renderTagsPromise()
    .then(() => {
        document.querySelector('#submit-new-note')
            .addEventListener('click', saveNote)


    })
    .catch(err => console.log(err))

// --------------------------
/**
 * save a note to json file
 */
function saveNote() {
    let tags = []
    document.querySelectorAll('#tags-row-add input[name="selectedTags"]:checked')
        .forEach(checkbox => {
            tags.push(checkbox.value)
        })

    const note = {
        title: document.querySelector('#note-title').value,
        content: document.querySelector('#note-content').value,
        tags: tags.join(',')

    }
    try {
        ['title', 'content', 'tags'].forEach(key => {
            if (note[key].trim().length === 0)
                throw new Error(`${key} must not be empty`)

        })

        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(() => {
                closeModal('#add-note-modal')
                window.location = '/'
            })
            .catch(err => alert(err))
    } catch (error) {
        alert(error)
    }
}

// --------------------------
function editOneNote(button) {
    button.addEventListener('click', function (event) {
        event.preventDefault()
        const id = parseInt(this.parentNode.dataset.index) + 1
        const titleInput = document.querySelector('#note-title-edit')
        const contentInput = document.querySelector('#note-content-edit')
        const tagsInput = document.querySelector('#tags-row-edit')
        document.querySelector('#edit-note-button').setAttribute('data-carid', id)

        fetch(`/api/notes/${id}`)
            .then(data => data.json())
            .then(note => {
                titleInput.value = note.title
                contentInput.value = note.content
                M.updateTextFields()
                enableCheckBoxes(note.tags.split(','))
                openModal('#edit-note-modal')
            })
            .catch(err => alert(err))
    })
}

// --------------------------
function enableCheckBoxes(valuesArray) {
    document.querySelectorAll(`#tags-row-edit  input[name='selectedTags']`)
        .forEach(checkbox => {
            checkbox.checked = !!valuesArray.includes(checkbox.value)
        })
}

// --------------------------
function closeModal(modalSelector) {
    const addNoteModal = document.querySelector(modalSelector)
    const instance = M.Modal.getInstance(addNoteModal)
    instance.close()
}

// --------------------------
function openModal(modalSelector) {
    const addNoteModal = document.querySelector(modalSelector)
    const instance = M.Modal.getInstance(addNoteModal)
    instance.open()
}

// --------------------------
/**
 * update a note to json file
 */
document.querySelector('#edit-note-button')
    .addEventListener('click', function () {
        let tags = []
        document.querySelectorAll('#tags-row-edit input[name="selectedTags"]:checked')
            .forEach(checkbox => {
                tags.push(checkbox.value)
            })

        const note = {
            title: document.querySelector('#note-title-edit').value,
            content: document.querySelector('#note-content-edit').value,
            tags: tags.join(',')

        }
        try {
            ['title', 'content', 'tags'].forEach(key => {
                if (note[key].trim().length === 0)
                    throw new Error(`${key} must not be empty`)

            })
            const id = this.dataset.carid
            fetch(`/api/notes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
                .then(() => {
                    closeModal('#edit-note-modal')
                    window.location = '/'
                })
                .catch(err => alert(err))
        } catch (error) {
            alert(error)
        }
    })
