describe('My First Test', () => {

  // 1. Visit a web page.
  // 2. Query for an element.
  // 3. Interact with that element.
  // 4. Assert about the content on the page.
 
  it('Visits the products page', () => {
    cy.visit('http://localhost:4200/');
  });

});
