// Generar los botones del carousel automaticamente

function initCarouselControl() {
    document.addEventListener("DOMContentLoaded", function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
    const dotContainer = carouselContainer.querySelector('.dot-container');
    
    // Generar los botones del carousel
    carouselItems.forEach((item, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para cambiar el ítem actual al ítem seleccionado
    });
    dotContainer.appendChild(dot);
    });
    });
}

export const init = () => {
    if(document.querySelector('.carousel-container')) {
        initCarouselControl();
        console.log('init carousel control');
}
}

