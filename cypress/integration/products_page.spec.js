import {addProduct, visitPage, checkcomponents, checkBasketTotal, checkBasketLength, cleanTheBasket} from '../pageObjects/products_page_object';
import * as Element from '../pageObjects/constElements';
import {toogleQuickView, quickViewIsVisible, quickViewIsNotVisible} from '../pageObjects/quick_view_pageObjects';


describe('Products Page', () => {
  
    it('should visit the product page', () => {
      visitPage();
      
      checkcomponents();
    });
  
    it('should add product to the basket', () => {
      addProduct(Element.productOne);

      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 

    it('should add the same products to the basket', () => {
      addProduct(Element.productOne);
      addProduct(Element.productOne);
  
      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 
  
    it('should add two different products to the basket', () => {
      addProduct(Element.productOne);
      addProduct(Element.productTwo);

      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueTwo);
    }); 

    it('should clean the basket', () => {
      cleanTheBasket();
  
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
