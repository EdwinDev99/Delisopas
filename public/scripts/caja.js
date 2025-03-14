document.addEventListener("DOMContentLoaded", () => {
  mostrarComandas();
});

function mostrarComandas() {
  let listaComandas = document.getElementById("lista-comandas");
  if (!listaComandas) return;

  let pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];

  listaComandas.innerHTML = "";

  let totalFacturado = 0;

  pedidosGuardados.forEach((pedido, index) => {
    let div = document.createElement("div");
    div.classList.add("comanda");
    div.innerHTML = `
          <h3>Pedido ${index + 1}</h3>
          <ul>
              ${pedido.productos
                .map((prod) => `<li>${prod.nombre} - ${prod.precio} COP</li>`)
                .join("")}
          </ul>
          <p>Total: ${pedido.total} COP</p>
      `;

    totalFacturado += pedido.total;
    listaComandas.appendChild(div);
  });

  let resumen = document.createElement("p");
  resumen.innerHTML = `<strong>Total Facturado: ${totalFacturado} COP</strong>`;
  listaComandas.appendChild(resumen);
}
