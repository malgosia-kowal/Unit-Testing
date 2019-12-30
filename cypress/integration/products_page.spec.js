import {clickById, visitPage, checkComponents, checkBasketTotal, checkBasketLength, changeLocaleToPl, changeLocaleToGB} from '../pageObjects/products_page_object';
import * as Element from '../pageObjects/constElements';
import {toogleQuickView, quickViewIsVisible, quickViewIsNotVisible} from '../pageObjects/quick_view_pageObjects';


describe('productsPage', () => {
  
    it('should visit the product page', () => {
      visitPage();
      
      checkComponents();
    });
  
    it('should add product to the basket', () => {
      clickById(Element.productOne);
      
      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 

    it('should change locale', () => {
      changeLocaleToPl();
      
      checkBasketTotal(Element.contain, "zl");

      cy.get(".header").contains("Nielegalny sklep kotow (Meow)");
    }); 

    it('should convert price correctly when one product in the basket', () => {
      changeLocaleToGB();

      cy.get("#basketTotal").should("contain", "0,20");
    });

    it('should add the same products to the basket', () => {
      clickById(Element.productOne);
      clickById(Element.productOne);
  
      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 
  
    it('should add two different products to the basket', () => {
      clickById(Element.productOne);
      clickById(Element.productTwo);

      checkBasketTotal(Element.notContain, "0,00");
      checkBasketLength(Element.contain, "2");
    });

    it('should clean the basket', () => {
      clickById(Element.cleanButton);
  
      checkBasketTotal(Element.contain, 0);
      checkBasketLength(Element.contain, 0);
    });

    it('should convert price correctly when more products in the basket', () => {
      changeLocaleToPl();
      cy.wait(700);

      clickById(Element.productOne);
      clickById(Element.productTwo);

      checkBasketLength(Element.contain, "2");
      checkBasketTotal(Element.contain, "2,23");

      changeLocaleToGB();
      cy.wait(700);

      checkBasketTotal(Element.contain, "0,45");

      changeLocaleToPl();
      cy.wait(700);

      checkBasketTotal(Element.contain, "2,23");
      
      clickById(Element.cleanButton);
    });  
  
    it('should open quickView', () => {
      toogleQuickView();
  
      quickViewIsVisible();
    });
      
    it('should close quickView', () => {
      toogleQuickView();
  
      quickViewIsNotVisible();
    }); 
});
