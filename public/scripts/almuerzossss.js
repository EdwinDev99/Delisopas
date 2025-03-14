const closeModal = document.getElementById("close-icon");

closeModal.addEventListener("click", () => {
  modal.close();
});

let pedidoActual = { mesa: "", productos: [], total: 0 };

function agregarAlmuerzo(nombre, precio) {
  pedidoActual.productos.push({ nombre, precio });
  pedidoActual.total += precio;

  const modal = document.getElementById("modal");
  if (modal) {
    modal.showModal();
  } else {
    console.error("No se encontró el modal en el DOM");
  }
}
