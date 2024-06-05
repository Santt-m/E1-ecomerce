// section promos
// aca se importa el script que genera los componentes del carousel
import { initRenderCarouselItems } from './assets/promos/renderCarouselItems.js';
// aca se importa el carousel
import { initCarousel } from './assets/promos/carousel.js';


// section products
// aca se importa el script que renderiza los productos
import { initRenderProductsAndFilters } from './assets/products/renderProducts.js';



const init = () =>{
    // iniciamos los componentes
    // promos
    initRenderCarouselItems();
    initCarousel();
    
    // products
    initRenderProductsAndFilters();
}


document.addEventListener("DOMContentLoaded", function() {
    init();
});
