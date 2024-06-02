import { products } from "./productsList.js";

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
    }
};

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
    }
};

export const initRenderProductsAndFilters = () =>{
    if (document.querySelector(".products")){
        renderProductsAndFilters();
    }
};