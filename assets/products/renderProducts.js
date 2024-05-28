import { products } from "./productsList.js";

const renderProducts = () => {
    const productContainer = document.querySelector(".products");
    productContainer.innerHTML = "";

    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.style.backgroundImage = `url("./assets/products/productsList/${product.id}/img0.jpg")`;
        productElement.style.backgroundSize = 'cover';
        productElement.style.backgroundPosition = 'center';

        productElement.innerHTML = `
            <div class="productDetails fadeIn">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>💲​${product.price}</p>
                <a class="productBtn" href="./details.html?id=${product.id}">ver !</a>
            </div>
        `;

        productContainer.appendChild(productElement);

        const productDetails = productElement.querySelector('.productDetails');

        // agregar evento de mouseenter y mouseleave para mostrar productDetails
        productElement.addEventListener('mouseenter', () => {
            productDetails.style.display = 'flex';
        });
        productElement.addEventListener('mouseleave', () => {
            productDetails.style.display = 'none';
        });
    });
};

export const initRenderProducts = () =>{
    if (document.querySelector(".products")){
        renderProducts();
    }
}
