import { products } from "./productsList.js";
import { addToCart } from "../cart/cart.js";

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
                        <button class="cartBtnAgregar" data-id="${product.id}" data-quantity="1">1</button>
                        <button class="cartBtnAdd" data-id="${product.id}">+</button>
                        <button class="cartBtnSubtract" data-id="${product.id}">-</button>
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
            const cartBtnAdd = productElement.querySelector('.cartBtnAdd');
            const cartBtnSubtract = productElement.querySelector('.cartBtnSubtract');
            const cartBtnAgregar = productElement.querySelector('.cartBtnAgregar');

            cartBtnAgregar.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'), 10);
                const productQuantity = parseInt(e.target.getAttribute('data-quantity'), 10);
                addToCart(productId, productQuantity);
            });

            cartBtnAdd.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'), 10);
                const productQuantity = cartBtnContainer.querySelector(`.cartBtnAgregar[data-id="${productId}"]`);
                productQuantity.textContent = parseInt(productQuantity.textContent, 10) + 1;
            });

            cartBtnSubtract.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'), 10);
                const productQuantity = cartBtnContainer.querySelector(`.cartBtnAgregar[data-id="${productId}"]`);
                if (parseInt(productQuantity.textContent, 10) > 1) {
                    productQuantity.textContent = parseInt(productQuantity.textContent, 10) - 1;
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


