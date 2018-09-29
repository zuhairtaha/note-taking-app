function renderTags(tags) {
    let tagsRowContent = ''
    tags.forEach(tag => {
        tagsRowContent += `
            <div class="col s4">
                <label>
                    <input type="checkbox" name="selectedTags" value="${tag.id}"/>
                    <span>${tag.tag}</span>
                </label>
            </div>
        `
    })
    document.querySelectorAll('.tags-row').forEach(tagsRow => {
        tagsRow.innerHTML = tagsRowContent
    })

    return tagsRowContent
}

// --------------------------
/**
 * render tags and return promise
 * @returns {Promise}
 */
export function renderTagsPromise() {
    return new Promise((resolve) =>
        fetch('/api/tags')
            .then(data => data.json())
            .then(tags => {
                renderTags(tags)
                return resolve()
            })
    )
}