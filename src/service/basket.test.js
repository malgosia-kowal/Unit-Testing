const basket = require('./Basket.js');

const mockProduct = { name:'nikey', price: 1255, quantity: 1 };
const product2 = { name:'cream', price: 342, quantity: 1 };

test('that init basket can be returned', () => {
  expect(basket.get().products.length).toEqual(0);
  expect(basket.get().total).toEqual(0);
});
test('add product to basket', () => {
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
    basket.addProduct(mockProduct);


    
    expect(basket.get().products.length).toEqual(1);
    
    expect(basket.get().total).toEqual(1255);
});