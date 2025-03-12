const contenedor = document.getElementById("containersComandas");

const comandas = [];

function NuevaComanda(numeroMesa, sopa, principio, jugo, ensalada, proteina) {
  this.numeroMesa = numeroMesa;
  this.sopa = sopa;
  this.principio = principio;
  this.jugo = jugo;
  this.ensalada = ensalada;
  this.proteina = proteina;
  this.id = crypto.randomUUID();
}

function agregarComanda(numeroMesa, sopa, principio, jugo, ensalada, proteina) {
  const comanda = new NuevaComanda(
    numeroMesa,
    sopa,
    principio,
    jugo,
    ensalada,
    proteina
  );
  comandas.push(comanda);
  actualizarComandas();
}

function actualizarComandas() {
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas comandas

  comandas.forEach((mesa) => {
    const mesaDiv = document.createElement("div"); // Cambié el nombre para evitar conflictos
    mesaDiv.classList.add("mesa-card");

    mesaDiv.innerHTML = `
        <h3>Mesa ${mesa.numeroMesa}</h3>
        <p><strong>Sopa:</strong> ${mesa.sopa}</p>
        <p><strong>Principio:</strong> ${mesa.principio}</p>
        <p><strong>Jugo:</strong> ${mesa.jugo}</p>
        <p><strong>Ensalada:</strong> ${mesa.ensalada}</p>
        <p><strong>Proteína:</strong> ${mesa.proteina}</p>
    `;

    contenedor.appendChild(mesaDiv); // Ahora sí se agrega correctamente al DOM
  });
}

// Agregar una comanda para probar
agregarComanda(1, "arroz", "frijol", "maracuyá", "no", "pollo");
