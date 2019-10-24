describe('Quick View', () => {

    it('should visit the product page', () => {
      cy.visit('http://localhost:4200/');
        
      cy.get('app-products')
        .should('exist');
      cy.get('app-quickview')
        .should('exist');
      cy.get('app-basket')
        .should('exist');
    });

    it('should check if product is visible in quickview', () => {
      cy.get('[id="addToBasketButton-1"]')
        .click(); 
      cy.get('[id="quickViewButton"]')
        .click();
        
      cy.get('.quickviewProduct')
        .should('have.length', '1');  
    });
      
    it('should check if product can be removed from quickview', () => {
      cy.get('.quickviewProduct')
        .find('.closeIcon')
        .click();
            
      cy.get('quickviewProduct')
        .should('have.length', '0');  
      cy.get('[id="basketTotal"]')
        .should('contain', '0');
      cy.get('[id="basketLength"]')
        .should('contain', '0');
      
      cy.get('[id="quickViewButton"]')
        .click();
    });
      
    it('should check if the same products can be added to quickview', () => {
      cy.get('[id="addToBasketButton-0"]')
         .click(); 
      cy.get('[id="addToBasketButton-0"]')
         .click();   
      cy.get('[id="quickViewButton"]')
         .click();      
      
      cy.get('.quickviewContainer')
         .find('.quickviewProduct')
         .should('have.length','1'); 
      
      cy.get('[id="quickViewButton"]')
         .click();    
    });
      
    it('should check if many different products can be added to quickview', () => {
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
        .should('have.length', '3');  
    });
    
    it('should clean all products in the quick view', () => {
      cy.get('[id="clearTheBasketButton"]')
        .click();
        
      cy.get('.quickviewContainer')
        .find('.quickviewProduct')
        .should('have.length', '0');  
    });

});
