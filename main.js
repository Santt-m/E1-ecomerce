// main.js
import { initRenderCarouselItems } from './assets/promos/renderCarouselItems.js';
import { initCarousel } from './assets/promos/carousel.js';
import { initRenderProductsAndFilters } from './assets/products/renderProducts.js';
import { cartInit } from './assets/cart/cart.js';
import { initWpOrder } from './assets/cart/wpOrder.js';

const init = () => {
    initRenderCarouselItems();
    initCarousel();
    initRenderProductsAndFilters();
    cartInit();
    initWpOrder();
}

document.addEventListener("DOMContentLoaded", init);
