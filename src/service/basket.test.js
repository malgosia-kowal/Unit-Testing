const basket = require('./Basket');
const Product = require('../entity/Product');


const mockProduct = new Product('nikey', 1255, 1, '8');
const product2 = new Product ('cream', 342, 1, '6' );
const product3= ('cream', 342, '6', 7 );

// todo: There was a missed specification on how basket should work
// we will be using Product entity now to work with product and we have new property added `size`
// you can have a look at index.js file to see how to create new product.
// new requirements are:
// 1. Test that if we were to add the same product into the basket we will increment quantity rather than adding new product.
//    You can have a look and test -> basket.isTheSameProduct(product1, product2) method to see how do we identify identical products.
// 2. Remove product should work the same if we were to remove the same product we would expect:
//      a) if quantity is more than 1, we will decrement quantity
//      b) if quantity is 1 we will remove that item from the basket.
//  above does not exist yet but you can write failing tests and I will make them pass.
// 3. Bonus: write negative test that error should be thrown if we were pass anything else than Product class to addProduct() method.

// You can use now new script `npm run test:watch` so you dont need to run the same command over again.

describe('basket', () => {
  
  beforeEach(() => {
    basket.clear() 
  });

  it('that init basket can be returned', () => {
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
  });

  it('add product to basket', () => {
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
    basket.addProduct(mockProduct);
    expect(basket.get().products.length).toEqual(1);
    expect(basket.get().total).toEqual(1255);
  });

  it('that multiple products can be added to basket', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(product2);
    expect(basket.get().products.length).toEqual(2);
    expect(basket.get().total).toEqual(1597);
  });

  it('that product can be removed from the basket', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(product2);
    basket.removeProduct(mockProduct.name);
    expect(basket.get().products.length).toEqual(1);
    expect(basket.get().total).toEqual(342);
  });
  
  it('remove the same product will decrement quantity', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(mockProduct);
    basket.isTheSameProduct(mockProduct, mockProduct);
    basket.removeProduct(mockProduct.name);
    expect(mockProduct.quantity).toEqual(1);
  });
  
  it('does basket.applyDiscount for amount work', () => {
    basket.addProduct(product2);
    basket.applyDiscount(20, false);
    expect(basket.get().total).toEqual(322);
  });

  it('does basket.applyDiscount for percentage work', () => {
    basket.addProduct(product2);
    basket.applyDiscount(20);
    expect(basket.get().total).toEqual(273.6);
  });

  it('if basket can be cleared ', () => {
    basket.clear();
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
  });

  it('add the same product into the basket and check increment quantity ', () => {
    basket.addProduct(mockProduct);
    basket.isTheSameProduct(mockProduct, mockProduct);
    expect(mockProduct.quantity).toBe(2);
  });

  it('if we were pass anything else than Product class to addProduct() method.', () => {
    basket.addProduct(product3);
    expect(addProduct).toThrowError();
  });
});
