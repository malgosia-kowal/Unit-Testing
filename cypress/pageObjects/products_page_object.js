const visitPage = () => {
    cy.visit('http://localhost:4200/')
}

const addProduct = (buttonId) => {
    cy.get(`[id=${buttonId}]`)
      .click();
}

const checkcomponents= () => {
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

const cleanTheBasket = () => {
    cy.get('[id="clearTheBasketButton"]')
      .click();
}

module.exports = {addProduct, visitPage,
                  checkcomponents, checkBasketTotal,
                  checkBasketLength, cleanTheBasket,
                 };

