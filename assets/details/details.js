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
            <p>Precio: $ ${detallesProducto.price}</p>
            <div class="cartAdd">
                <button class="subtract-item" data-id="${detallesProducto.id}">-</button>
                <span class="quantity" data-id="${detallesProducto.id}">1</span>
                <button class="add-item" data-id="${detallesProducto.id}">+</button>
                <button class="addToCart" data-id="${detallesProducto.id}">Agregar al carrito</button>
            </div>
        </div>
    `;

    const botonSubtractItem = document.querySelector('.subtract-item');
    const botonAddItem = document.querySelector('.add-item');
    const spanQuantity = document.querySelector('.quantity');
    const botonAgregarAlCarrito = document.querySelector('.addToCart');

    const updateQuantity = () => {
        const cantidad = parseInt(spanQuantity.textContent, 10);
        const idProducto = parseInt(spanQuantity.getAttribute('data-id'), 10);
        const producto = products.find(producto => producto.id === idProducto);
        addToCart(producto, cantidad);
    }

    if (botonSubtractItem && botonAddItem && spanQuantity && botonAgregarAlCarrito) {
        botonSubtractItem.addEventListener('click', (e) => {
            const cantidad = parseInt(spanQuantity.textContent, 10);
            if (cantidad > 1) {
                spanQuantity.textContent = cantidad - 1;
                updateQuantity();
            }
        });

        botonAddItem.addEventListener('click', (e) => {
            const cantidad = parseInt(spanQuantity.textContent, 10);
            spanQuantity.textContent = cantidad + 1;
            updateQuantity();
        });

        botonAgregarAlCarrito.addEventListener('click', (e) => {
            updateQuantity();
        });
    }

    initDetailsImg();
}


// Ejecutar la función renderizarDetallesDelProducto cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", renderizarDetallesDelProducto);




