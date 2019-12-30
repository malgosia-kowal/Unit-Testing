const visitPage = () => {
    cy.visit('http://localhost:4200/')
}

const clickById = (buttonId) => {
    cy.get(`[id=${buttonId}]`)
      .click();
}

const checkComponents= () => {
    cy.get('app-products')
      .should('exist');
    cy.get('app-quickview')
      .should('exist');
    cy.get('app-basket')
      .should('exist');
}

const checkBasketTotal = (contain, value) => {
    cy.get('[id="basketTotal"]')
      .should(`${contain}`, `${value}`);
}

const checkBasketLength = (contain, value) => {
    cy.get('[id="basketLength"]')
      .should(`${contain}`, `${value}`);
}
const changeLocaleToPl = () => {
    cy.get(".flagsContainer")
    .get(".flag-icon-pl").click();
}
const changeLocaleToGB = () => {
  cy.get(".flagsContainer")
  .get(".flag-icon-gb").click();
}


module.exports = {clickById, visitPage,
                  checkComponents, checkBasketTotal,
                  checkBasketLength,changeLocaleToPl,
                  changeLocaleToGB
                 };

