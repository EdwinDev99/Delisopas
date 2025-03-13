let precioTotal = 0;

let pedidoActual = { mesa: "", productos: [], total: 0 };

const closeModalDesayunos = document.getElementById("close-icon2");

closeModalDesayunos.addEventListener("click", () => {
  modalDesayunos.close();
});

function agregarDesayuno(nombre, precio) {
  pedidoActual.productos.push({ nombre, precio });
  pedidoActual.total += precio;
  console.log("el total es", pedidoActual.total);

  const modal = document.getElementById("modalDesayunos");
  if (modal) {
    modal.showModal();
  } else {
    console.error("No se encontró el modal en el DOM");
  }
}

document
  .getElementById("enviar-desatuno")
  .addEventListener("click", function () {
    const inputs = document.querySelectorAll("input[type='number']"); // Selecciona solo los inputs numéricos
    inputs.forEach((input) => {
      const cantidad = parseInt(input.value) || 0; // Convierte a número y evita NaN

      switch (input.id) {
        case "changua":
          precioTotal += 6500 * cantidad;
          break;
        case "caldo":
          precioTotal += 7500 * cantidad;
          break;
        case "chocoPan":
          precioTotal += 3500 * cantidad;
          break;
        case "huevosArroz":
          precioTotal += 4500 * cantidad;
          break;
        case "huevoGusto":
          precioTotal += 3500 * cantidad;
          break;
        case "TamalEspecial":
          precioTotal += 8000 * cantidad;
          break;
        case "cafe":
          precioTotal += 3000 * cantidad;
          break;
        case "chocolate":
          precioTotal += 3000 * cantidad;
          break;
        case "perico":
          precioTotal += 2000 * cantidad;
          break;
        case "jugoHit":
          precioTotal += 2000 * cantidad;
          break;
        case "jugoHitG":
          precioTotal += 3000 * cantidad;
          break;
        case "jugoNatural":
          precioTotal += 4500 * cantidad;
          break;
        case "JNaruralLeche":
          precioTotal += 5500 * cantidad;
          break;
        default:
          console.warn(
            `El producto con ID "${input.id}" no tiene un precio asignado.`
          );
      }
    });

    console.log(`Total a pagar: ${precioTotal} COP`);
  });
