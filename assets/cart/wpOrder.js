// wpOrder.js

import { products } from "../products/productsList.js";

// Número de teléfono de WhatsApp (cambiar por el número real)
const phoneNumber = '+541135966247';

// Función para enviar el pedido por WhatsApp
export const sendWhatsAppOrder = () => {
    // Obtener el pedido del carrito
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = cartItems.map(itemId => {
        const product = getProductById(itemId);
        return `${product.name}: ${product.price}`;
    });
    const orderMessage = '¡Hola! Quiero realizar el siguiente pedido:\n\n' + orderItems.join('\n');

    // Enviar el pedido por WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;
    console.log('Enviando pedido por WhatsApp:', whatsappURL);

    // Abrir WhatsApp en una nueva ventana o pestaña
    window.open(whatsappURL, '_blank');

    // Notificar que se ha enviado el pedido por consola
    console.log('Pedido enviado por WhatsApp.');
}

// Función para obtener un producto por su ID
const getProductById = (productId) => {
    // Buscar el producto por su ID en la lista de productos
    const product = products.find(p => p.id === productId);
    if (product) {
        return product;
    } else {
        console.error('Producto no encontrado con ID:', productId);
        // En caso de que no se encuentre el producto, retornar un objeto vacío o manejar el error de otra manera
        return { name: 'Producto no encontrado', price: 0 };
    }
}

// Escuchar el evento "DOMContentLoaded"
document.addEventListener("DOMContentLoaded", () => {
    // Imprimir en consola el número de teléfono de WhatsApp y el pedido de muestra
    console.log('Número de teléfono de WhatsApp:', phoneNumber);

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const sampleOrderItems = cartItems.map(itemId => {
        const product = getProductById(itemId);
        return `${product.name}: ${product.price}`;
    });
});

// init
export const initWpOrder = () => {
    const wpOrderButton = document.getElementById("wpOrder");
    if (wpOrderButton) {
        wpOrderButton.addEventListener("click", sendWhatsAppOrder);
    }
}
