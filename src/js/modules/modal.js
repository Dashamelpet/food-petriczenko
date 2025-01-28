function openModal(modalSelector, modalInterval) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if(modalInterval) {
        clearInterval(modalInterval);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'none';
    document.body.style.overflow = '';
};
    


function modal(triggerSelector, modalSelector, modalInterval) {
    //    modal
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.style.display == 'block') {
            closeModal(modalSelector);
        }
    });
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalSelector, modalInterval))
    });
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });
    

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalInterval);
            window.removeEventListener('scroll', showModalScroll);
        }
    }
    window.addEventListener('scroll', showModalScroll);

}

export default modal;
export {openModal}; 
export {closeModal}; 