import {clickOnTheButton, visitPage, checkcomponents, checkBasketTotal, checkBasketLength, cleanTheBasket} from '../pageObjects/products_page_object';
import * as Element from '../pageObjects/constElements';
import {openQuickView, quickViewIsVisible, quickViewIsNotVisible} from '../pageObjects/quick_view_pageObjects';


describe('Products Page', () => {
  
    it('should visit the product page', () => {
      visitPage();
      
      checkcomponents();
    });
  
    it('should add product to the basket', () => {
      clickOnTheButton(Element.buttonOne);

      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 

    it('should add the same products to the basket', () => {
      clickOnTheButton(Element.buttonOne);
      clickOnTheButton(Element.buttonOne);
  
      checkBasketTotal(Element.notContain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueOne);
    }); 
  
    it('should add two different products to the basket', () => {
      clickOnTheButton(Element.buttonOne);
      clickOnTheButton(Element.buttonOnProductTwo);

      checkBasketTotal(Element.notContain), Element.valueZero;
      checkBasketLength(Element.contain, Element.valueTwo);
    }); 

    it('should clean the basket', () => {
      cleanTheBasket();
  
      checkBasketTotal(Element.contain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueZero);
    });
  
    it('should open quickView', () => {
      openQuickView();
  
      quickViewIsVisible();
    });
      
    it('should close quickView', () => {
      openQuickView();
  
      quickViewIsNotVisible();
    }); 

});
