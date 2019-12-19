const devBtn = document.getElementById('filter-dev');
const socialBtn = document.getElementById('filter-social');
const miscBtn = document.getElementById('filter-misc');
const allBtn = document.getElementById('filter-all');
const links = document.querySelectorAll('.links__list-item');
const filterBtns = document.querySelectorAll('.filter__list-item button');
const footer = document.querySelector('.footer__copyright');

function setCategory(event, category) {
    filterBtns.forEach(btn => {
        btn.classList.remove('is-active');
        if (btn === event.currentTarget) {
            btn.classList.add('is-active');
        }
    })

    links.forEach(link => {
        if (link.dataset.category === category) {
            link.classList.remove('hide');
        } else {
            link.classList.add('hide');
        }
        if (category === 'all'){
            link.classList.remove('hide');
        }
    })
}

function getCurrentYear() {
    const date = new Date();
    return date.getFullYear().toString();
}

function init() {
    devBtn.addEventListener('click', (event) => setCategory(event, 'dev'));
    socialBtn.addEventListener('click', (event) => setCategory(event, 'social'));
    miscBtn.addEventListener('click', (event) => setCategory(event, 'misc'));
    allBtn.addEventListener('click', (event) => setCategory(event, 'all'));

    footer.innerHTML = `<p><small>Copyright © ${getCurrentYear()} Gabriel Laroche. All Rights Reserved.</small></p>`
}

(init());
