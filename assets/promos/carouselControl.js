const renderCarouselControl = () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselControl = document.querySelector('.carousel-control');

    if (carouselItems.length === 0) return;

    carouselControl.innerHTML = '';
    carouselItems.forEach((item, i) => {
        const btn = document.createElement('button');
        btn.classList.add('dot');
        btn.setAttribute('data-index', i);

        if (i === 0) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            changeCarousel(index);
        });

        carouselControl.appendChild(btn);
    });
    console.log('renderCarouselControl');
};

export const initCarouselControl = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const carouselItems = document.querySelectorAll('.carousel-item');
        renderCarouselControl();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselControl = document.querySelector('.carousel-control');
    carousel.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const index = e.target.getAttribute('data-index');
            changeCarousel(index);
        }
    });
    carouselControl.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const index = e.target.getAttribute('data-index');
            changeCarousel(index);
        }
    });
});


