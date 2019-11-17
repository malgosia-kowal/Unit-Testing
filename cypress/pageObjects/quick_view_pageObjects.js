const openQuickView = () => {
    cy.get(`[id="quickViewButton"]`)
      .click();
}
const quickViewIsVisible = () => {
    cy.get('.quickviewContainer')
      .should('be.visible');
}
const quickViewIsNotVisible = () => {
    cy.get('.quickviewContainer')
      .should('not.be.visible');  
}
const checkProductsVisible = (value) => {
    cy.get('.quickviewProduct')
      .should('have.length', `${value}`); 
}
const removeProductsFromQuickView = () => {
    cy.get('.quickviewProduct')
      .find('.closeIcon')
      .click();
}
const checkSameProductsInQuickview = () => {
    cy.get('.quickviewContainer')
    .find('.quickviewProduct')
    .should('have.length','1'); 
  
}

module.exports = {openQuickView, quickViewIsVisible,
    quickViewIsNotVisible, checkProductsVisible, removeProductsFromQuickView, checkSameProductsInQuickview};