const modal = document.getElementById("modalDesayunos");
const especificacionesInput = document.getElementById(
  "especificaciones-desayunos"
);
const closeModal = document.getElementById("close-icon2");
const enviarPedidoBtn = document.getElementById("enviarPedido");
const totalProductos = document.getElementById("total-productos");
const totalPrecio = document.getElementById("total-precio");

let pedidoTemporal = null;
let resumenPedido = {}; // Para contar productos
let precioTotal = 0;

const precios = {
  changua: 6500,
  caldo: 7500,
  chocoPan: 3500,
  huevosArroz: 4500,
  huevoGusto: 3500,
  TamalEspecial: 8000,
  cafe: 3000,
  chocolate: 3000,
  perico: 2000,
  jugoHit: 2000,
  jugoHitG: 3000,
  jugoNatural: 4500,
  JNaruralLeche: 5500,
};

function abrirModal(tipo, nombre, precio) {
  pedidoTemporal = { tipo, nombre, precio };
  especificacionesInput.value = "";
  modal.showModal();
}

document
  .getElementById("formulario-desayunos")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });

// Agregar pedido con especificaciones
enviarPedidoBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (pedidoTemporal) {
    const especificaciones = especificacionesInput.value.trim();
    agregarPedido(
      pedidoTemporal.tipo,
      pedidoTemporal.nombre,
      pedidoTemporal.precio,
      especificaciones
    );
    modal.close();
  }
});

closeModal.addEventListener("click", () => {
  modal.close();
});

function agregarPedido(tipo, nombre, precio, especificaciones = "") {
  const listaPedido = document.getElementById("lista-pedido");
  const li = document.createElement("li");
  li.textContent = `${nombre} - €${precio} ${
    especificaciones ? "(Especificaciones: " + especificaciones + ")" : ""
  }`;
  listaPedido.appendChild(li);

  // Actualizar cantidad de productos
  if (!resumenPedido[nombre]) {
    resumenPedido[nombre] = { cantidad: 1, precio: precio };
  } else {
    resumenPedido[nombre].cantidad++;
  }

  // Sumar el precio total
  precioTotal += precio;

  // Actualizar el resumen
  actualizarResumen();
}

// Detectar cambios en los inputs de cantidad y actualizar el total
document.querySelectorAll(".input-radio input").forEach((input) => {
  input.addEventListener("input", actualizarResumen);
});

// Función para actualizar la cantidad de productos y el total
function actualizarResumen() {
  let totalItems = 0;
  let nuevoTotal = 0;

  // Contar combos
  for (let producto in resumenPedido) {
    totalItems += resumenPedido[producto].cantidad;
    nuevoTotal +=
      resumenPedido[producto].cantidad * resumenPedido[producto].precio;
  }

  // Contar productos individuales desde los inputs
  document.querySelectorAll(".input-radio input").forEach((input) => {
    let cantidad = parseInt(input.value) || 0;
    let nombre = input.id;

    if (precios[nombre]) {
      totalItems += cantidad;
      nuevoTotal += cantidad * precios[nombre];
    }
  });

  // Actualizar la UI
  totalProductos.textContent = `Productos: ${totalItems}`;
  totalPrecio.textContent = `Total: €${nuevoTotal}`;
}
