import { products } from "../products/productsList.js";

// Función para obtener el ID del producto desde la URL
const getProductIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const urlID = parseInt(params.get('id'), 10); // Convertir el ID a entero
    console.log('URL ID:', urlID);
    return urlID;
}

// Función para obtener los detalles del producto por ID
const getProductDetails = (productId) => {
    console.log('Buscando detalles para el producto con ID:', productId);
    return products.find(product => product.id === productId);
}

// Función para renderizar los detalles del producto
const renderProductDetails = () => {
    console.log('Ejecutando renderProductDetails');
    const productId = getProductIdFromURL();
    if (!productId) {
        console.error('No se proporcionó ID del producto en la URL');
        return;
    }

    const product = getProductDetails(productId);
    if (!product) {
        console.error('No se encontró producto con el ID proporcionado');
        return;
    }

    const productDetailsContainer = document.querySelector('.product-details');
    if (!productDetailsContainer) {
        console.error('No se encontró el contenedor de detalles del producto');
        return;
    }

    console.log('Producto encontrado:', product);

    // Renderizar los detalles del producto en el contenedor
    productDetailsContainer.innerHTML = `
        <h1>${product.name}</h1>
        <img src="../assets/products/productsList/${product.id}/img0.jpg" alt="${product.name}">
        <p>${product.description}</p>
        <p>Precio: ${product.price}</p>
    `;
}

// Función de inicialización para los detalles del producto
export const initDetails = () => {
    console.log('Inicializando detalles del producto');
    console.log('Agregando event listener para DOMContentLoaded en initDetails');
    // Esperar a que el DOM esté completamente cargado antes de renderizar los detalles del producto
    document.addEventListener("DOMContentLoaded", () => {
        console.log('details init - DOMContentLoaded disparado');
        renderProductDetails();
    });
}
