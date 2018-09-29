"use strict";

function scrollIt(element) {
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': element.offsetTop
  });
}

document.querySelectorAll('.scroll-to-notes').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    scrollIt(document.querySelector('#notes-bar'));
  });
});