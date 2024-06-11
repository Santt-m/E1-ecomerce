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
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productId] = (cart[productId] || 0) + 1; // Agregar la cantidad del producto
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Restar del carrito
export const subtractFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[productId]) {
        cart[productId]--; // Reducir la cantidad del producto
        if (cart[productId] === 0) {
            delete cart[productId]; // Eliminar el producto si la cantidad es cero
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Eliminar del carrito
const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    delete cart[productId]; // Eliminar el producto
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
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartContainer = document.querySelector(".cartItemContainer");

    // consoleamos el contenido del localstorage para control
    console.log("Contenido del localStorage:", cart);

    if (!cartContainer) {
        console.error("No se encontró el contenedor del carrito");
        return;
    }

    cartContainer.innerHTML = ''; // Limpiar el contenido actual

    for (const productId in cart) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product && product.name && product.price) {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <img src="./assets/products/productsList/${product.id}/img0.jpg" alt="Product ${product.id}">
                <p>${product.name}</p>
                <p>$ ${product.price}</p>
                <div class="quantity">
                    <button class="subtract-item" data-id="${product.id}">-</button>
                    <span>${cart[productId]}</span>
                    <button class="add-item" data-id="${product.id}">+</button>
                </div>
                <button class="remove-item" data-id="${product.id}">X</button>
            `;
            cartContainer.appendChild(itemDiv);
        } else {
            console.error("El item del carrito no tiene la estructura correcta", product);
        }
    }

    // Añadir eventos a los botones de cantidad
    document.querySelectorAll('.subtract-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'), 10);
            subtractFromCart(productId);
        });
    });

    document.querySelectorAll('.add-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'), 10);
            addToCart(productId);
        });
    });

    // Añadir eventos a los botones de eliminar
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'), 10);
            removeFromCart(productId);
        });
    });
}


