import {clickById, visitPage, checkComponents, checkBasketTotal, checkBasketLength, changeLocale} from '../pageObjects/products_page_object';
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
      changeLocale("pl");
      
      checkBasketTotal(Element.contain, "zl");

      cy.get(".header").contains("Nielegalny sklep kotow (Meow)");
    }); 

    it('should convert price correctly when one product in the basket', () => {
      changeLocale("gb");

      cy.get("#basketTotal").should("contain", "1,00");
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
      changeLocale("pl")
      
      clickById(Element.productOne);
      clickById(Element.productTwo);

      checkBasketLength(Element.contain, "2");
      checkBasketTotal(Element.contain, "11,02");

      changeLocale("gb")
      
      checkBasketTotal(Element.contain, "2,23");

      changeLocale("pl")
    
      checkBasketTotal(Element.contain, "11,02");
      
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
