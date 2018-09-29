"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTagsPromise = renderTagsPromise;

function renderTags(tags) {
  var tagsRowContent = '';
  tags.forEach(function (tag) {
    tagsRowContent += "\n            <div class=\"col s4\">\n                <label>\n                    <input type=\"checkbox\" name=\"selectedTags\" value=\"".concat(tag.id, "\"/>\n                    <span>").concat(tag.tag, "</span>\n                </label>\n            </div>\n        ");
  });
  document.querySelectorAll('.tags-row').forEach(function (tagsRow) {
    tagsRow.innerHTML = tagsRowContent;
  });
  return tagsRowContent;
} // --------------------------

/**
 * render tags and return promise
 * @returns {Promise}
 */


function renderTagsPromise() {
  return new Promise(function (resolve) {
    return fetch('/api/tags').then(function (data) {
      return data.json();
    }).then(function (tags) {
      renderTags(tags);
      return resolve();
    });
  });
}