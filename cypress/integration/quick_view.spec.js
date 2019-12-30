import {clickById, visitPage, checkComponents,checkBasketTotal, checkBasketLength, changeLocaleToPl, changeLocaleToGB} from '../pageObjects/products_page_object';
import * as Element from '../pageObjects/constElements';
import {toogleQuickView, checkProductsVisible, removeProductsFromQuickView, checkSameProductsInQuickview, clickOnOverlay, quickViewIsNotVisible} from '../pageObjects/quick_view_pageObjects';
import { createYield } from 'typescript';

describe('Quick View', () => {

    it('should visit the product page', () => {
      visitPage();

      checkComponents();
    });

    it('should check if product is visible in quickview', () => {
      clickById(Element.productOne);
      clickById(Element.productTwo);
      toogleQuickView();
        
      checkProductsVisible(Element.valueTwo);
    });
      
    it('should check if product can be removed from quickview', () => {
      removeProductsFromQuickView();
            
      checkProductsVisible(1);
      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, 1);
      
      toogleQuickView();
    });
      
   it('should check if the same products can be added to quickview', () => {
      clickById(Element.productOne);
      clickById(Element.productOne );

      toogleQuickView();     
      
      checkSameProductsInQuickview();
      toogleQuickView();  
    });
      
    it('should check if many different products can be added to quickview', () => {
      clickById(Element.productOne);
      clickById(Element.productTwo);
      clickById(Element.productThree); 
      clickById(Element.productTwo);  
      toogleQuickView(); 
      
      checkProductsVisible(Element.valueThree);
      toogleQuickView();
    });

    it('should check if price was changed according to locale', () => {
      changeLocaleToGB();
      cy.wait(700);

      toogleQuickView(); 
      
      cy.get(".quickviewProduct").should(() =>{

        expect(".quickviewProduct").to.have.length(17);
        cypress.log(quickviewProduct);
      })
    });
    
    it('should clean all products in the quick view', () => {
      clickById(Element.cleanButton);
        
      checkProductsVisible(0);
    });

    it('should close quickView when user clicks outside of it', () => {
      clickOnOverlay();

      quickViewIsNotVisible();  
    });
});
