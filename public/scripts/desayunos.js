let pedidoActual = { mesa: "", productos: [], total: 0 };

const closeModalDesayunos = document.getElementById("close-icon2");

closeModalDesayunos.addEventListener("click", () => {
  modalDesayunos.close();
});

function agregarDesayuno(nombre, precio) {
  pedidoActual.productos.push({ nombre, precio });
  pedidoActual.total += precio;

  const modal = document.getElementById("modalDesayunos");
  if (modal) {
    modal.showModal();
  } else {
    console.error("No se encontró el modal en el DOM");
  }
}
