BASE_URL = "https://api.exchangerate.host";

const obtenerMonedas = () => {
  return fetch(`${BASE_URL}/latest`)
    .then((response) => response.json())
    .then((data) => {
      return data.rates;
    });
};

const convertirMonedas = (base = "USD", destino = "EUR") => {
  return fetch(`${BASE_URL}/convert?from=${base}&to=${destino}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const insertarMonedas = (monedas, selectElemento) => {
  for (const moneda in monedas) {
    const option = document.createElement("option");
    option.value = moneda;
    option.textContent = `${moneda}`;
    selectElemento.appendChild(option);
  }
};

obtenerMonedas()
  .then((monedas) => {
    const selectElementos = document.querySelectorAll(".select-estilo");
    selectElementos.forEach((select) => {
      insertarMonedas(monedas, select);
    });
  })

const calcular = () => {
    const btnCalcular = document.querySelector(".btn-calcular");
    const contenedorResultado = document.querySelector(".contenedor-resultado");
    
    btnCalcular.addEventListener("click", () => {
      const cantidad = document.getElementById("campo-cantidad").value;
      const monedaBase = document.querySelectorAll(".select-estilo")[0].value;
      const monedaDestino = document.querySelectorAll(".select-estilo")[1].value;
    
      convertirMonedas(monedaBase, monedaDestino)
        .then((data) => {
          const resultado = data.result;
          const resultadoFinal = cantidad * resultado;
          contenedorResultado.textContent = `${cantidad} ${monedaBase} = ${resultadoFinal.toFixed(2)} ${monedaDestino}`;
        });
    });
}

calcular();
