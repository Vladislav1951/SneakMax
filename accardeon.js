const accardionToggle = (slideMenu) => (e) => {
    slideMenu.forEach((links) => {
        const hidePanel = links.nextElementSibling;
        if (links === e.currentTarget) {
            e.currentTarget.classList.toggle('active');
            hidePanel.classList.toggle('active-block');
        } else {
            links.classList.remove('active');
            hidePanel.classList.remove('active-block');
        }
    });
};

const slideMenu = document.querySelectorAll('.accardion-link');

slideMenu.forEach((links) => {
    links.addEventListener('click', accardionToggle(slideMenu))
});