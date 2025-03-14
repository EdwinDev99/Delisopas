const socket = io("http://localhost:3000");

socket.on("actualizarPedidos", (pedidos) => {
  mostrarPedidos(pedidos);
});

function mostrarPedidos(pedidos) {
  const contenedor = document.getElementById("containersComandas");
  contenedor.innerHTML = "";

  pedidos.forEach((pedido) => {
    const divPedido = document.createElement("div");
    divPedido.classList.add("pedido");

    let productosHTML = "";
    pedido.items.forEach((item) => {
      productosHTML += `<p>${item.cantidad}x ${item.nombre} - $${
        item.cantidad * item.precio
      }</p>`;
    });

    divPedido.innerHTML = `
      <h3>Pedido #${pedido.id}</h3>
      ${productosHTML}
      <p><strong>Total: $${pedido.total}</strong></p>
      <button onclick="marcarComoPagado(${pedido.id})">Marcar como pagado</button>
    `;

    contenedor.appendChild(divPedido);
  });
}

function marcarComoPagado(idPedido) {
  socket.emit("pedidoPagado", idPedido);
}
