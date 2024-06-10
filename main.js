// init carousel
import { initRenderCarouselItems } from './assets/promos/renderCarouselItems.js';
import { initCarousel } from './assets/promos/carousel.js';

// init products
import { initRenderProductsAndFilters } from './assets/products/renderProducts.js';

// init carrito + envio por whatsapp
import { cartInit } from './assets/cart/cart.js';
import { initWpOrder } from './assets/cart/wpOrder.js';

console.log('Inicio de la inicialización');

const init = () => {
    console.log('Inicializando render de items del carrusel');
    initRenderCarouselItems();

    console.log('Inicializando carrusel');
    initCarousel();

    console.log('Inicializando render de productos y filtros');
    initRenderProductsAndFilters();

    console.log('Inicializando carrito');
    cartInit();

    console.log('Inicializando pedido por WhatsApp');
    initWpOrder();

    console.log('Inicialización completada');
}

document.addEventListener("DOMContentLoaded", init);
console.log('Event listener para DOMContentLoaded añadido');
