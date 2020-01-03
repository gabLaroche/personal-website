(function() {
    const currentYearElem = document.querySelector('.footer__current-year');
    const currentYear = new Date().getFullYear();

    currentYearElem.innerHTML = `&copy; ${currentYear.toString()}`;
}());
