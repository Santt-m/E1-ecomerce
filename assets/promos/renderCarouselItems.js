import {products } from '../products/productsList.js';

// array de promos a renderizar
let promos = [2,3];


const renderCarouselItems = () => {
    const carouselContainer = document.querySelector('.carousel');

    carouselContainer.innerHTML = "";

    promos.forEach((promo) => {
        const product = products.find(p => p.id === promo);
        if (product) {
            const carouselItem = document.createElement('li');
            carouselItem.classList.add('carousel-item');

            carouselItem.innerHTML = `
                <img src="./assets/products/productsList/${product.id}/img0.jpg" alt="Promo ${promo}">
                <div>
                    <h4>${product.name}</h4>
                    <p>$ ${product.price}</p>
                    <a href="./details.html?id=${product.id}">ver !</a>
                </div>
            `;

            carouselContainer.appendChild(carouselItem);
        }
    });
};

export const initRenderCarouselItems = () => {
    if (document.querySelector('.carousel')) {
        renderCarouselItems();
    }
};

