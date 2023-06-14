const menuBTN = document.querySelector('.menu-burger');
const menU = document.querySelector('.menu-list');

menuBTN.addEventListener('click', (e) => {
    menU.classList.toggle('active');
})

document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(menuBTN);

    if (!click) {
        menU.classList.remove('active');
    }
})