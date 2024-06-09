import { products } from "../products/productsList.js"; 

// Inicializar carrito
export const cartInit = () => {
    const cartElement = document.querySelector(".cart");
    const btnCart = document.querySelector(".cartbtn");

    if (cartElement && btnCart) {
        cartbtn();
        renderCart();
    } else {
        console.error("No se encontró el contenedor del carrito o el botón del carrito");
    }
}

// Botón carrito
const cartbtn = () => {
    const btnCart = document.querySelector(".cartbtn");
    const cart = document.querySelector(".cart");

    // botón abrir/cerrar carrito
    btnCart.addEventListener("click", () => {   
        cart.style.display = cart.style.display === "flex" ? "none" : "flex";
    });
}

// Agregar al carrito
export const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId); // Agregar solo el ID del producto
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Eliminar del carrito
const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Limpiar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cart');
    renderCart(); // Para actualizar la vista del carrito después de limpiar el localStorage
});

// Renderizar carrito
const renderCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector(".cartItemContainer");

    // consoleamos el contenido del localstorage para control
    console.log("Contenido del localStorage:", JSON.parse(localStorage.getItem('cart')));

    if (!cartContainer) {
        console.error("No se encontró el contenedor del carrito");
        return;
    }

    cartContainer.innerHTML = ''; // Limpiar el contenido actual

    cart.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product && product.name && product.price && product.id) {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <img src="./assets/products/productsList/${product.id}/img0.jpg" alt="Product ${product.id}">
                <span>${product.name}</span>
                <span>${product.price}</span>
                <button class="remove-item" data-id="${product.id}">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);
        } else {
            console.error("El item del carrito no tiene la estructura correcta", product);
        }
    });

    // Añadir eventos a los botones de eliminar
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'), 10);
            removeFromCart(productId);
        });
    });
}
