document
  .getElementById("enviar-desayuno")
  ?.addEventListener("click", function () {
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

    document.querySelectorAll("input[type='number']").forEach((input) => {
      const cantidad = parseInt(input.value) || 0;
      if (precios[input.id]) {
        precioTotal += precios[input.id] * cantidad;
      } else {
        console.warn(
          `El producto con ID "${input.id}" no tiene un precio asignado.`
        );
      }
    });

    console.log(`Total a pagar: ${precioTotal} COP`);
  });
