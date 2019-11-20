import {addProduct, visitPage, checkcomponents,checkBasketTotal, checkBasketLength, cleanTheBasket} from '../pageObjects/products_page_object';
import * as Element from '../pageObjects/constElements';
import {toogleQuickView, checkProductsVisible, removeProductsFromQuickView, checkSameProductsInQuickview, clickOnOverlay, quickViewIsNotVisible} from '../pageObjects/quick_view_pageObjects';

describe('Quick View', () => {

    it('should visit the product page', () => {
      visitPage();
      
      checkcomponents();
    });

    it('should check if product is visible in quickview', () => {
      addProduct(Element.productOne);
      toogleQuickView();
        
      checkProductsVisible(Element.valueOne);
    });
      
    it('should check if product can be removed from quickview', () => {
      removeProductsFromQuickView();
            
      checkProductsVisible(Element.valueZero);
      checkBasketTotal(Element.contain, Element.valueZero);
      checkBasketLength(Element.contain, Element.valueZero);
      
      toogleQuickView();
    });
      
    it('should check if the same products can be added to quickview', () => {
      addProduct(Element.productOne);
      addProduct(Element.productOne );

      toogleQuickView();     
      
      checkSameProductsInQuickview();
      toogleQuickView();  
    });
      
    it('should check if many different products can be added to quickview', () => {
      addProduct(Element.productOne);
      addProduct(Element.productTwo);
      addProduct(Element.productThree); 
      addProduct(Element.productTwo);  
      toogleQuickView(); 
      
      checkProductsVisible(Element.valueThree);
    });
    
    it('should clean all products in the quick view', () => {
      cleanTheBasket();
        
      checkProductsVisible(Element.valueZero);
    });

    it('should close quickView when user clicks outside of it', () => {
      clickOnOverlay();

      quickViewIsNotVisible();  
    });

});
