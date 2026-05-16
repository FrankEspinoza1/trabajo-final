const botonesAgregar = document.querySelectorAll(".btn-agregar");

const contadorCarrito = document.getElementById("contador-carrito");

const carritoIcono = document.querySelector(".carrito");

const panelCarrito = document.getElementById("panel-carrito");

const cerrarCarrito = document.getElementById("cerrar-carrito");

const carritoProductos = document.getElementById("carrito-productos");

const totalCarrito = document.getElementById("total-carrito");

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

const overlay = document.getElementById("overlay");

const filtroPrecio = document.getElementById("filtro-precio");

let carrito = [];

const carritoGuardado = localStorage.getItem("carrito");

if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);

  actualizarCarrito();
}

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.closest(".producto-card");

    const nombre = producto.querySelector("h4").textContent;

    const precio = producto.querySelector(".precio").textContent;

    const productoInfo = {
      nombre,
      precio,
    };

    carrito.push(productoInfo);

    actualizarCarrito();
  });
});

// ABRIR CARRITO

carritoIcono.addEventListener("click", () => {
  panelCarrito.classList.toggle("activo");
  overlay.classList.toggle("activo");
});

// CERRAR CARRITO

cerrarCarrito.addEventListener("click", () => {
  panelCarrito.classList.remove("activo");
  overlay.classList.remove("activo");
});

vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];

  actualizarCarrito();
});

overlay.addEventListener("click", () => {
  panelCarrito.classList.remove("activo");

  overlay.classList.remove("activo");
});

function actualizarCarrito() {
  // ACTUALIZAR CONTADOR
  contadorCarrito.textContent = carrito.length;

  // LIMPIAR PANEL
  carritoProductos.innerHTML = "";

  // TOTAL
  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");

    item.classList.add("item-carrito");

    item.innerHTML = `
    <div class="item-info">

    <h4>${producto.nombre}</h4>

    <p>${producto.precio}</p>

</div>

<button class="eliminar-item">

    <i class="fa-solid fa-trash"></i>

</button>
`;

    carritoProductos.appendChild(item);
    const botonEliminar = item.querySelector(".eliminar-item");

    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);

      actualizarCarrito();
    });

    // SUMAR TOTAL
    total += parseFloat(producto.precio.replace("S/", ""));
  });

  // MOSTRAR TOTAL
  totalCarrito.textContent = `S/ ${total}`;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const checkLibros = document.getElementById("libros");
const checkPapeleria = document.getElementById("papeleria");
const checkEscritura = document.getElementById("escritura");

const productos = document.querySelectorAll(".producto-card");
if (!checkLibros || !checkPapeleria || !checkEscritura || !filtroPrecio) {
  console.log("Filtros no encontrados");
} else {
  function filtrarProductos() {
    productos.forEach((producto) => {
      const categoria = producto.dataset.categoria;

      let mostrar = false;

      if (checkLibros.checked && categoria === "libros") {
        mostrar = true;
      }

      if (checkPapeleria.checked && categoria === "papeleria") {
        mostrar = true;
      }

      if (checkEscritura.checked && categoria === "escritura") {
        mostrar = true;
      }

      // Mostrar todos si no hay filtros
      if (
        !checkLibros.checked &&
        !checkPapeleria.checked &&
        !checkEscritura.checked
      ) {
        mostrar = true;
      }

      producto.style.display = mostrar ? "block" : "none";
    });
  }

  checkLibros.addEventListener("change", filtrarProductos);

  checkPapeleria.addEventListener("change", filtrarProductos);

  checkEscritura.addEventListener("change", filtrarProductos);

  filtroPrecio.addEventListener("change", () => {
    const valor = filtroPrecio.value;

    productos.forEach((producto) => {
      const precioTexto = producto.querySelector(".precio").textContent;

      const precio = parseFloat(precioTexto.replace("S/", ""));

      let mostrar = true;

      if (valor === "menos-50") {
        mostrar = precio < 50;
      }

      if (valor === "50-150") {
        mostrar = precio >= 50 && precio <= 150;
      }

      producto.style.display = mostrar ? "block" : "none";
    });
  });
}

// FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMWC6kwLlwqEU5KpM1axMC2k25wEkGexg",
  authDomain: "frank-773b4.firebaseapp.com",
  projectId: "frank-773b4",
  storageBucket: "frank-773b4.firebasestorage.app",
  messagingSenderId: "755249312421",
  appId: "1:755249312421:web:016702caa1e559bd21934c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const contenedor = document.getElementById("productos-firebase");

async function obtenerProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));

  querySnapshot.forEach((doc) => {
    const producto = doc.data();

    console.log(producto);

    contenedor.innerHTML += `
<div class="producto producto-card">

  <img src="${producto.imagen}" alt="${producto.nombre}" />

  <h4>${producto.nombre}</h4>
  <p class="precio">S/ ${producto.precio}</p>
  <button class="btn-index btn-agregar">
    Agregar al carrito
  </button>

</div>
`;
  });
}

obtenerProductos();
