const buttons = document.querySelectorAll('.projects__list-item-btn');

if (buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            buttons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.parentElement.classList.remove('is-active');
                    otherButton.classList.remove('is-active');
                }
            })
            event.currentTarget.parentElement.classList.toggle('is-active');
            event.currentTarget.classList.toggle('is-active');
        })
    })
}