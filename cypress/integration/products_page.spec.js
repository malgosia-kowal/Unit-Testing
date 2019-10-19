describe('My First Test', () => {

  // 1. Visit a web page.
  // 2. Query for an element.
  // 3. Interact with that element.
  // 4. Assert about the content on the page.
 
  describe('My First Test', () => {

    it('Visits the products page', () => {
      cy.visit('http://localhost:4200/');
  
      cy.get('app-products').should('exist');
      cy.get('app-quickview').should('exist');
      cy.get('app-basket').should('exist');
    });
  
    it('Add product to the basket', () => {
      cy.get('[id="addToBasketButton-0"]')
          .click();
      // TODO: this assertion relies on mockend
      // we should find a way to make it more robust
      cy.get('[id="basketTotal"]').should('contain', '123')
    }); 
  
    it('Add the same product to the basket', () => {
      cy.get('button').contains('Add to basket')
          .click();
      cy.get('button').contains('Add to basket')
          .click();
  
      cy.get('[id="basketLength"]').should('contain', '1');
      cy.get('[id="basketTotal"]').should('contain', '246');
    }); 
  
    it('Remove product from basket', () => {
      cy.get('button').contains('Add to basket')
          .click();
      cy.get('button').contains('Clean')
          .click();
          
      cy.get('[id="basketLength"]').should('contain', '0');
      
      cy.get('[id="basketTotal"]').should('contain', '0');
    }); 
  
    it('add two different products to basket', () => {
      cy.get('[id="addToBasketButton-0"]')
          .click();
      cy.get('[id="addToBasketButton-1"]')
          .click();
  
      cy.get('[id="basketLength"]').should('contain', '2');
      cy.get('[id="basketTotal"]').should('contain', '246');
    }); 
  
    it('open quickView and check if it is visible', () => {
      cy.get('[id="quickViewButton"]')
          .click();
  
      cy.get('.quickviewContainer').should('be.visible')  
    });
      
    it('close quickView and check if it is not visible', () => {
      cy.get('[id="quickViewButton"]')
          .click();
  
      cy.get('.quickviewContainer').should('not.be.visible');  
      
    }); 
  
    it('clean basket', () => {
    
      cy.get('[id="clearTheBasketButton"]')
          .click();
  
      cy.get('[id="basketTotal"]').should('contain', '0');
    });
  
  });

});
