import {clickOnTheButton, visitPage, checkcomponents,checkBasketTotal, checkBasketLength} from '../pageObjects/products_page_object';
import * as Element from '../pageObjects/constElements';
import {openQuickView, checkProductsVisible, removeProductsFromQuickView, checkSameProductsInQuickview} from '../pageObjects/quick_view_pageObjects';

describe('Quick View', () => {

    it('should visit the product page', () => {
      visitPage();
      checkcomponents();
    });

    it('should check if product is visible in quickview', () => {
      clickOnTheButton(Element.buttonOne);
      openQuickView();
        
      checkProductsVisible(Element.valueOne);
    });
      
    it('should check if product can be removed from quickview', () => {
      removeProductsFromQuickView();
            
      checkProductsVisible(Element.valueZero);
      checkBasketTotal(Element.contain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueZero);
      
      openQuickView();
    });
      
    it('should check if the same products can be added to quickview', () => {
      clickOnTheButton(Element.buttonOne);
      clickOnTheButton(Element.buttonOne);

      openQuickView();     
      
      checkSameProductsInQuickview();
      openQuickView();  
    });
      
    it('should check if many different products can be added to quickview', () => {
      clickOnTheButton(Element.buttonOne);
      clickOnTheButton(Element.buttonOnProductTwo);
      clickOnTheButton(Element.buttonOnProductThree); 
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

    it('should close quickView when user clicks outside of it', () => {
      cy.get('.overlay')
        .click();

      cy.get('.quickviewContainer')
        .should('not.be.visible');  
    });

});
