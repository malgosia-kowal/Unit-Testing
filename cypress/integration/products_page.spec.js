import {clickById, visitPage, checkComponents, checkBasketTotal, checkBasketLength} from '../pageObjects/products_page_object';
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

    it('should add the same products to the basket', () => {
      clickById(Element.productOne);
      clickById(Element.productOne);
  
      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 
  
    it('should add two different products to the basket', () => {
      clickById(Element.productOne);
      clickById(Element.productTwo);

      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueTwo);
    }); 

    it('should clean the basket', () => {
      clickById(Element.cleanButton)
  
      checkBasketTotal(Element.contain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueZero);
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
