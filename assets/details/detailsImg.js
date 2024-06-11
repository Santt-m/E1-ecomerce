import { products } from "../products/productsList.js";

// Función para obtener el ID del producto a partir de la URL
const obtenerIdProductoDeURL = () => {
    const url = new URL(window.location.href);
    const idProducto = parseInt(url.searchParams.get('id'), 10);
    return idProducto;
}

// De ese id busca en products el array img para renderizar el array de imagenes
const obtenerImagenesDelProducto = (idProducto) => {
    return products.find(producto => producto.id === idProducto).img;
}

// Función para mostrar la imagen correspondiente al botón seleccionado
const mostrarImagen = (index) => {
    const imagenes = document.querySelectorAll('.slide');
    imagenes.forEach((imagen, i) => {
        if (i === index) {
            imagen.style.display = 'flex';
        } else {
            imagen.style.display = 'none';
        }
    });
}

// Función para construir la URL de la imagen
const construirURLImagen = (idProducto, imagen) => {
    return `../assets/products/productsList/${idProducto}/${imagen}`;
}

// Función para establecer el background del botón
const establecerBackgroundDelBoton = (boton, url) => {
    boton.style.backgroundImage = `url(${url})`;
    boton.style.backgroundSize = 'cover';
    boton.style.backgroundPosition = 'center';
}

// init detailsImg
export const initDetailsImg = () => {
    const idProducto = obtenerIdProductoDeURL();
    if (!idProducto) return;

    const imagenesDelProducto = obtenerImagenesDelProducto(idProducto);
    if (!imagenesDelProducto) {
        console.error(`No se encontró imágenes del producto con el ID ${idProducto}`);
        return;
    }

    const contenedorImagenes = document.querySelector('.details-img');
    const contenedorBotones = document.querySelector('.details-botones');
    if (!contenedorImagenes || !contenedorBotones) {
        console.error('No se encontró contenedor de imagenes o botones');
        return;
    }

    imagenesDelProducto.forEach((imagen, index) => {
        const img = document.createElement('img');
        img.src = construirURLImagen(idProducto, imagen);
        img.classList.add('slide');
        img.style.display = index === 0 ? 'flex' : 'none';
        contenedorImagenes.appendChild(img);

        const boton = document.createElement('button');
        boton.classList.add('boton');
        boton.setAttribute('data-index', index);
        establecerBackgroundDelBoton(boton, construirURLImagen(idProducto, imagen));
        contenedorBotones.appendChild(boton);
    });

    const botones = contenedorBotones.querySelectorAll('.boton');
    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            mostrarImagen(index);
        });
    });

    botones[0].classList.add('activo');
}

// Ejecutar la función initDetailsImg cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", initDetailsImg);
