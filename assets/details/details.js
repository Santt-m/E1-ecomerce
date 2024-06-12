import { products } from "../products/productsList.js";
import { addToCart } from "../cart/cart.js";
import { initDetailsImg } from "./detailsImg.js";

// Función para obtener el ID del producto a partir de la URL
const obtenerIdProductoDeURL = () => {
    const url = new URL(window.location.href);
    const idProducto = parseInt(url.searchParams.get('id'), 10);
    return isNaN(idProducto) ? null : idProducto;
}

// Función para obtener los detalles de un producto a partir de su ID
const obtenerDetallesDelProducto = (idProducto) => {
    return products.find(producto => producto.id === idProducto);
}

// Función para renderizar los detalles de un producto
const renderizarDetallesDelProducto = () => {
    const idProducto = obtenerIdProductoDeURL();
    if (!idProducto) return;

    const detallesProducto = obtenerDetallesDelProducto(idProducto);
    if (!detallesProducto) {
        console.error(`No se encontró ningún producto con el ID ${idProducto}`);
        return;
    }

    const contenedorDetallesProducto = document.querySelector('.product-details');
    if (!contenedorDetallesProducto) {
        console.error('No se encontró ningún contenedor de detalles del producto');
        return;
    }

    contenedorDetallesProducto.innerHTML = `
        <div class="details-img">
            <div class="details-botones"></div>
        </div>
        <div class="details-info">
            <h1>${detallesProducto.name}</h1>
            <p>${detallesProducto.description}</p>
            <p>Precio: $${detallesProducto.price}</p>
            <div class="cartAdd">
                <button class="subtract-item" data-id="${detallesProducto.id}">-</button>
                <span class="quantity" data-id="${detallesProducto.id}">${obtenerCantidadProductoEnCarrito(detallesProducto.id)}</span>
                <button class="add-item" data-id="${detallesProducto.id}">+</button>
                <button class="addToCart" data-id="${detallesProducto.id}">Agregar al carrito</button>
            </div>
        </div>
    `;

    const botonSubtractItem = document.querySelector('.subtract-item');
    const botonAddItem = document.querySelector('.add-item');
    const spanQuantity = document.querySelector('.quantity');
    const botonAgregarAlCarrito = document.querySelector('.addToCart');

    const obtenerCantidadActual = () => parseInt(spanQuantity.textContent, 10);
    const actualizarCantidadEnSpan = (nuevaCantidad) => spanQuantity.textContent = nuevaCantidad;

    if (botonSubtractItem && botonAddItem && spanQuantity && botonAgregarAlCarrito) {
        botonSubtractItem.addEventListener('click', () => {
            let cantidad = obtenerCantidadActual();
            if (cantidad > 1) {
                cantidad -= 1;
                actualizarCantidadEnSpan(cantidad);
            }
        });

        botonAddItem.addEventListener('click', () => {
            let cantidad = obtenerCantidadActual();
            cantidad += 1;
            actualizarCantidadEnSpan(cantidad);
        });

        botonAgregarAlCarrito.addEventListener('click', () => {
            const cantidad = obtenerCantidadActual();
            addToCart(detallesProducto.id, cantidad); // Utilizamos addToCart de cart.js
        });
    }

    // Llamar a la función de inicialización de imágenes aquí
    initDetailsImg();
}

// Función para obtener la cantidad de un producto en el carrito desde el LocalStorage
const obtenerCantidadProductoEnCarrito = (idProducto) => {
    const carrito = JSON.parse(localStorage.getItem('cart')) || {};
    return carrito[idProducto] || 1; // Devuelve 1 si no hay cantidad en el carrito
}

// Ejecutar la función renderizarDetallesDelProducto cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", renderizarDetallesDelProducto);
