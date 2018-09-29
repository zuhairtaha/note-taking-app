function scrollIt(element) {
    window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': element.offsetTop
    })
}


document.querySelectorAll('.scroll-to-notes')
    .forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            scrollIt(document.querySelector('#notes-bar'))
        })
    })

