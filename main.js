// init carousel
import { initRenderCarouselItems } from './assets/promos/renderCarouselItems.js';
import { initCarousel } from './assets/promos/carousel.js';

// init products
import { initRenderProductsAndFilters } from './assets/products/renderProducts.js';

// init carrito + envio por whatsapp
import { cartInit } from './assets/cart/cart.js';
import { initWpOrder } from './assets/cart/wpOrder.js';

const init = () => {
    initRenderCarouselItems();

    initCarousel();

    initRenderProductsAndFilters();

    cartInit();

    initWpOrder();

    console.log('Inicialización completada');
}

document.addEventListener("DOMContentLoaded", init);
