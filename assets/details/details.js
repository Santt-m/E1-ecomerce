 import { products } from "../products/productsList.js";
 import { addToCart, getQuantityInCart } from "../cart/cart.js"; // Asegúrate de importar getQuantityInCart
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
 
     const cantidadEnCarrito = getQuantityInCart(detallesProducto.id); // Usar la función correcta
 
     contenedorDetallesProducto.innerHTML = `
         <div class="details-img">
             <div class="details-botones"></div>
         </div>
         <div class="details-info">
             <h1>${detallesProducto.name}</h1>
             <p>${detallesProducto.description}</p>
             <p>Precio: $${detallesProducto.price}</p>
             <div class="quantity">
                 <button class="add-item" data-id="${detallesProducto.id}">Agregar al carrito</button>
                 <span class="cantidad-en-carrito">${cantidadEnCarrito}</span>
             </div>
         </div>
     `;
 
     // Añadir eventos a los botones de agregar al carrito
     document.querySelector('.add-item').addEventListener('click', (e) => {
         const productId = parseInt(e.target.getAttribute('data-id'), 10);
         addToCart(productId);
         actualizarCantidadEnCarrito(productId);
    });

    // Llamar a la función de inicialización de imágenes aquí
    initDetailsImg();

     // Actualizar la cantidad en el carrito
     actualizarCantidadEnCarritoContinuo(idProducto);
 }
 
 const actualizarCantidadEnCarritoContinuo = (productId) => {
     const intervalId = setInterval(() => {
         const cantidad = getQuantityInCart(productId);
         const spanCantidad = document.querySelector('.cantidad-en-carrito');
         if (spanCantidad) {
             spanCantidad.textContent = cantidad;
         }
     }, 1000);
     return intervalId;
 }

// iniciar renderizarDetallesDelProducto al cargar el DOM
 window.addEventListener('DOMContentLoaded', renderizarDetallesDelProducto);

