describe('My First Test', () => {

  describe('basket', () => {

    it('should visit the product page', () => {
      cy.visit('http://localhost:4200/');
  
      cy.get('app-products').should('exist');
      cy.get('app-quickview').should('exist');
      cy.get('app-basket').should('exist');
    });
  
    it('should add product to the basket', () => {
      cy.get('[id="addToBasketButton-0"]')
        .click();
    
      cy.get('[id="basketTotal"]').should('not.contain', '0');
      cy.get('[id="basketLength"]').should('not.contain', '0');
     }); 
  
    it('should add the same products to the basket', () => {
      cy.get('[id="addToBasketButton-0"]').contains('Add to basket')
        .click();
      cy.get('[id="addToBasketButton-0"]').contains('Add to basket')
        .click();
  
      cy.get('[id="basketTotal"]').should('not.contain', '0');
      cy.get('[id="basketLength"]').should('not.contain', '0');
    }); 
  
    it('should add two different products to the basket', () => {
      cy.get('[id="addToBasketButton-0"]')
        .click();
      cy.get('[id="addToBasketButton-1"]')
        .click();
  
      cy.get('[id="basketTotal"]').should('not.contain', '0');
      cy.get('[id="basketLength"]').should('not.contain', '0');
    }); 
  
    it('should open quickView', () => {
      cy.get('[id="quickViewButton"]')
        .click();
  
      cy.get('.quickviewContainer').should('be.visible');
    });
      
    it('should close quickView', () => {
      cy.get('[id="quickViewButton"]')
        .click();
  
      cy.get('.quickviewContainer').should('not.be.visible');  
    }); 
  
    it('should clean the basket', () => {
      cy.get('[id="clearTheBasketButton"]')
        .click();
  
      cy.get('[id="basketTotal"]').should('contain', '0');
      cy.get('[id="basketLength"]').should('contain', '0');
    });

    it('should check if product is visible in quickview', () => {
      cy.get('[id="quickViewButton"]')
        .click();
      cy.get('[id="addToBasketButton-1"]')
        .click();   

      cy.get('.quickviewProduct')
        .should('be.visible');  
    });

    it('should check if product can be removed from quickview', () => {
      cy.get('.quickviewProduct')
        .find('.closeIcon')
        .click();
      
      cy.get('quickviewProduct')
        .should('not.be.visible');  
      cy.get('[id="basketTotal"]').should('contain', '0');
      cy.get('[id="basketLength"]').should('contain', '0');
      cy.get('[id="quickViewButton"]')
        .click();
    });

    it('should check if many products can be added to quickview', () => {
      cy.get('[id="addToBasketButton-0"]')
        .click();
      cy.get('[id="addToBasketButton-1"]')
        .click();  
      cy.get('[id="addToBasketButton-2"]')
        .click();      
      cy.get('[id="quickViewButton"]')
        .click();    

      cy.get('.quickviewContainer')
        .find('.quickviewProduct')
        .should('be.visible');  
    });

  });
});
