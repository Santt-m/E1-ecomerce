import { products } from "./productsList.js";
import { addToCart, subtractFromCart } from "../cart/cart.js";

const renderProductsAndFilters = () => {
    renderProducts();
    renderFilters();
};

const renderProducts = () => {
    const productContainer = document.querySelector(".products");
    productContainer.innerHTML = "";

    if (products) {
        products.forEach((product) => {
            if (!product.tags) {
                product.tags = [];
            }
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
                    <div class="cartBtnContainer">
                        <button class="cartBtnAdd btn" data-id="${product.id}">+</button>
                        <span class="quantity" data-id="${product.id}">0</span>
                        <button class="cartBtnSubtract btn" data-id="${product.id}">-</button>
                        <button class="btnApplyCart btn" data-id="${product.id}">Aplicar</button>
                    </div>
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

            // Añadir evento a los botones de "Agregar al carrito"
            const cartBtnContainer = productElement.querySelector('.cartBtnContainer');
            const cartBtnAdd = productElement.querySelector(`.cartBtnAdd[data-id="${product.id}"]`);
            const cartBtnSubtract = productElement.querySelector(`.cartBtnSubtract[data-id="${product.id}"]`);
            const btnApplyCart = productElement.querySelector(`.btnApplyCart[data-id="${product.id}"]`);
            const quantity = productElement.querySelector(`.quantity[data-id="${product.id}"]`);

            btnApplyCart.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'), 10);
                const productQuantity = parseInt(quantity.textContent, 10);
                if (productQuantity > 0) {
                    addToCart(productId, productQuantity);
                }
            });

            document.querySelectorAll('.subtract-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'), 10);
                    subtractFromCart(productId);
                });
            });

            cartBtnSubtract.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'), 10);
                const productQuantity = parseInt(quantity.textContent, 10) - 1;
                if (productQuantity >= 0) {
                    quantity.textContent = productQuantity;
                    addToCart(productId, productQuantity);
                }
            });
        });
    }
};




// filtros
const renderFilters = () => {
    const filterContainer = document.querySelector('.filter-container');
    if (!filterContainer) {
        console.error('No se encontró el contenedor de filtros');
        return;
    }

    // Obtener todos los tags únicos
    const tags = new Set(products.map(product => product.tag));

    // Crear botones de filtro para cada tag
    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        btn.setAttribute('data-tag', tag);
        btn.textContent = tag;

        // Agregar evento de clic para filtrar productos
        btn.addEventListener('click', () => {
            filterProducts(tag);
        });

        filterContainer.appendChild(btn);
    });

    // Agregar botón para mostrar todos los productos
    const showAllBtn = document.createElement('button');
    showAllBtn.classList.add('filter-btn');
    showAllBtn.textContent = 'Mostrar Todos';
    showAllBtn.addEventListener('click', () => {
        renderProducts();
    });
    filterContainer.appendChild(showAllBtn);
};

const filterProducts = (tag) => {
    const filteredProducts = products.filter(product => product.tag === tag);
    renderFilteredProducts(filteredProducts);
};

const renderFilteredProducts = (filteredProducts) => {
    const productContainer = document.querySelector(".products");
    
    let cartBtnAgregar = document.querySelectorAll(".cartBtnAgregar");

    productContainer.innerHTML = "";

    if (filteredProducts) {
        filteredProducts.forEach((product) => {
            if (!product.tags) {
                product.tags = [];
            }
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
                    <button class="cartBtnAgregar" data-id="${product.id}">Agregar al carrito</button>
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

        // Añadir evento a los botones de "Agregar al carrito"
        document.querySelectorAll('.cartBtnAgregar').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'), 10);
                addToCart(productId);
            });
        });
    }
};

export const initRenderProductsAndFilters = () =>{
    if (document.querySelector(".products")){
        renderProductsAndFilters();
    }
};


