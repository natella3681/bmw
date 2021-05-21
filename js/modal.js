//const moreElems = document.querySelectorAll('.more');
const modalElem = document.querySelector('.modal');
const designBlockElem = document.querySelector('.design-block');

const openModal = () => {
    modalElem.classList.remove('hidden');
    disabledScroll();
};

const closeModal = () => {
    modalElem.classList.add('hidden');
    enabledScroll();
};


designBlockElem.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('.more')) {
        openModal();
    }
});




modalElem.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('overlay') ||
        target.classList.contains('modal__close')) {
        closeModal();
    }
});
