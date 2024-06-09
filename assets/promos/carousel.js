export function carousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentItem = 0;
    const displayDuration = 5000; // Tiempo que cada ítem está visible (en milisegundos)
    const fadeDuration = 1000; // Duración de las animaciones fade (en milisegundos)

    function showItem(index) {
        items[index].style.display = 'flex';
        items[index].classList.add('slideIn');

        setTimeout(() => {
            items[index].classList.remove('slideIn');
        }, fadeDuration);
    }

    function hideItem(index) {
        items[index].classList.add('slideOut');

        setTimeout(() => {
            items[index].classList.remove('slideOut');
            items[index].style.display = 'none';
        }, fadeDuration);
    }

    function nextItem() {
        hideItem(currentItem);
        currentItem = (currentItem + 1) % items.length;

        setTimeout(() => {
            showItem(currentItem);
        }, fadeDuration);
    }

    function prevItem() {
        hideItem(currentItem);
        currentItem = (currentItem + items.length - 1) % items.length;

        setTimeout(() => {
            showItem(currentItem);
        }, fadeDuration);
    }

    function controlButton(direction) {
        const controlContainer = document.querySelector('.carousel-control');
        const controlButton = document.createElement('button');
        controlButton.classList.add(`carousel-control-${direction}`);
        controlButton.addEventListener('click', direction === 'next' ? nextItem : prevItem);
        controlContainer.appendChild(controlButton);
    }

    // Inicialización
    showItem(currentItem);

    // Agregar botones de control
    controlButton('next');
    controlButton('prev');

    // Cambia de tarjeta cada displayDuration + fadeDuration * 2
    setInterval(nextItem, displayDuration + fadeDuration * 2);
}

export const initCarousel = () => {
    if (document.querySelector(".carousel")) {
        carousel();
    }
}