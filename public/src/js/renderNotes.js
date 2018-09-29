// ============ promises =================
// note promise
const notesPromise = new Promise(resolve => {
    fetch('/api/notes')
        .then(data => data.json())
        .then(notes => resolve(notes))
})

// tags promise
export const tagsPromise = new Promise(resolve => {
    fetch('/api/tags')
        .then(data => data.json())
        .then(tags => resolve(tags))
})

// handle all promises
export function renderNotesPromise() {
    return Promise
        .all([notesPromise, tagsPromise])
        .then(data => {
            return renderNotes(data[0], data[1])
        })
}

// --------------------------
/**
 * get tags for a note
 * @param {Array} tagsArray
 * @param {Array} allTags
 * @returns {string}
 */
export function getNoteTags(tagsArray, allTags) {
    return allTags
        .filter(tag => tagsArray.includes(tag.id))
        .map(tag => `<span class="badge grey lighten-3 tag-span">
                        <i class="material-icons tiny">local_offer</i>
                        ${tag.tag}
                      </span>`)
        .join(" ")
}

// --------------------------
/**
 * render all notes
 * @param {Array}notes
 * @param {Array} tags
 */
function renderNotes(notes, tags) {
    let notesTbodyContent = ''
    notes.forEach((note, index) => {
        notesTbodyContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${note.title}</td>
                <td>${getNoteTags(note.tags, tags)}</td>
                <td data-index="${index}" class="control-buttons">
                
                    <a class="btn red delete-note-button">
                        <i class="material-icons">delete</i>
                    </a>
                    
                    <a class="btn orange edit-note-button">
                        <i class="material-icons">mode_edit</i>
                    </a>
                    
                    <a class="btn blue modal-trigger view-note-button" 
                        href="#view-note-modal">
                        <i class="material-icons">remove_red_eye</i>
                    </a>
                    
                </td>
            </tr>
        `
    })


    const notesTbody = document.querySelector('#notes-tbody')
    notesTbody.innerHTML = notesTbodyContent
    return notesTbody

}



