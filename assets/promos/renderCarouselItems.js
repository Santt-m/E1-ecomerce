// importo la lista de productos
import { products } from "../products/productsList.js";

// Array de productos en promo para agregar al carrousel
let promoProducts = [1,3,];

// función para renderizar los elementos del carrousel
const renderCarouselItems = () => {
    promoProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("carousel-item");
        productElement.innerHTML = `
        <li class="carousel-item">
                    <img src="./assets/img/img0.jpg" alt="">
                    <div class="fx -c -a-c -j-s-a">
                        <h4>Titulo</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <a class="btn2" href="">Comprar !</a>
                    </div>
                </li>
        `;
    }
    );
}

export const initRenderCarouselItems = () => {
    if (document.querySelector(".carousel")){
        renderCarouselItems();
    };
}
