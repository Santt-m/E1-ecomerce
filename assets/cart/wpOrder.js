import { products } from "../products/productsList.js";

// Número de teléfono de WhatsApp (cambiar por el número real)
const phoneNumber = '+541135966247';

// Función para obtener un producto por su ID
const getProductById = (productId) => {
    // Buscar el producto por su ID en la lista de productos
    return products.find(product => product.id === productId);
}

// Función para enviar el pedido por WhatsApp
export const sendWhatsAppOrder = () => {
    // Obtener el pedido del localStorage
    const order = JSON.parse(localStorage.getItem('cart')) || {};
    const orderItems = Object.entries(order).map(([itemId, quantity]) => {
        const product = getProductById(parseInt(itemId));
        if (!product) {
            console.warn(`Producto no encontrado con ID: ${itemId}`);
            return null;
        }
        const itemTotal = product.price * quantity;
        return `${quantity} x ${product.name}: $${product.price} (total: $${itemTotal})`;
    }).filter(Boolean);
    const total = Object.values(order).reduce((sum, quantity) => sum + (quantity * getProductById(parseInt(quantity)).price), 0);

    // Enviar el pedido por WhatsApp
    const orderMessage = `¡Hola! Quiero realizar el siguiente pedido:\n\n${orderItems.join('\n')}\n\nTotal: $${total}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappURL, '_blank');
}

// Escuchar el evento "DOMContentLoaded"
document.addEventListener("DOMContentLoaded", () => {
    // Imprimir en consola el número de teléfono de WhatsApp
    console.log('Número de teléfono de WhatsApp:', phoneNumber);
});

// Inicializar el botón de envío a WhatsApp
export const initWpOrder = () => {
    const wpOrderButton = document.getElementById("wpOrder");
    if (wpOrderButton) {
        wpOrderButton.addEventListener("click", sendWhatsAppOrder);
    }
}