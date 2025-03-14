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

  precioTotal += precio;

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

  totalProductos.textContent = `Productos: ${totalItems}`;
  totalPrecio.textContent = `Total: €${nuevoTotal}`;
}

const socket = io("http://localhost:3000");

// Función para enviar un pedido al backend
document.getElementById("enviar-desayuno").addEventListener("click", () => {
  const mesaSeleccionada = document.getElementById("mesa").value;
  let productosPedido = [];
  let totalPedido = 0;

  // Recorrer los productos seleccionados manualmente en la lista
  for (let producto in resumenPedido) {
    productosPedido.push({
      nombre: producto,
      cantidad: resumenPedido[producto].cantidad,
      precio: resumenPedido[producto].precio,
    });
    totalPedido +=
      resumenPedido[producto].cantidad * resumenPedido[producto].precio;
  }

  // Capturar productos de los inputs manuales
  document.querySelectorAll(".input-radio input").forEach((input) => {
    let cantidad = parseInt(input.value) || 0;
    let nombre = input.id;

    if (precios[nombre] && cantidad > 0) {
      productosPedido.push({
        nombre: nombre,
        cantidad: cantidad,
        precio: precios[nombre],
      });
      totalPedido += cantidad * precios[nombre];
    }
  });

  // Verificar si hay productos seleccionados
  if (productosPedido.length === 0) {
    alert("No hay productos en el pedido.");
    return;
  }

  // Estructura del pedido a enviar
  const pedido = {
    mesa: mesaSeleccionada,
    productos: productosPedido,
    total: totalPedido,
  };

  // Enviar el pedido al backend con socket.io
  socket.emit("nuevoPedido", pedido);

  // Limpiar la lista después de enviar
  document.getElementById("lista-pedido").innerHTML = "";
  resumenPedido = {};
  precioTotal = 0;
  actualizarResumen();

  alert("Pedido enviado correctamente.");
});

// Cuando el backend actualiza los pedidos
socket.on("actualizarPedidos", (pedidos) => {
  console.log("Pedidos actualizados:", pedidos);
});

// Marcar un pedido como pagado
function marcarComoPagado(idPedido) {
  socket.emit("pedidoPagado", idPedido);
}

// Escuchar el resumen de ventas
socket.on("actualizarResumen", (resumen) => {
  console.log("Resumen de ventas:", resumen);
});
