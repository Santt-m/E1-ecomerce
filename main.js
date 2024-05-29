import { initCarousel } from './assets/promos/carousel.js';

import { initRenderCarouselItems } from './assets/promos/renderCarouselItems.js';

import { initRenderProducts } from './assets/products/renderProducts.js';



const init = () =>{
    // iniciamos los componentes
    initRenderCarouselItems();
    initCarousel();
    
    initRenderProducts();
}


document.addEventListener("DOMContentLoaded", function() {
    init();

});
