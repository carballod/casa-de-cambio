describe("Casa de Cambio", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Muestra el titulo correctamente", () => {
    cy.contains("CASA DE CAMBIO");
  });

  it("Muestra las opciones de selección", () => {
    cy.get(".select-estilo").should("have.length", 2);
  });

  it("Permite ingresar la cantidad", () => {
    const cantidad = 5;
    cy.get("#campo-cantidad").type(cantidad);
  })

  it("Permite seleccionar el tipo de cambio", () => {
    const opcionOrigen = "AED";
    const opcionDestino = "AFN";

    cy.get(".select-estilo").eq(0).select(opcionOrigen);
    cy.get(".select-estilo").eq(1).select(opcionDestino);
  });

  it("calcula el resultado correctamente", () => {
    const cantidad = 2000;
    cy.get("#campo-cantidad").type(cantidad);
    cy.get(".select-estilo").eq(0).select("ARS");
    cy.get(".select-estilo").eq(1).select("EUR");
    
    cy.contains("Calcular").click();
    cy.get("#campo-cantidad").should("have.value", cantidad.toString());
  });

});
