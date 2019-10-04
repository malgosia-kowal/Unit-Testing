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

test('that multiple products can be added to basket', () => {
  basket.addProduct(product2);
  // assert that products amount increased
  expect(basket.get().products.length).toEqual(2);
  // assert that basket total price is correct
  expect(basket.get().total).toEqual(1597);
});

test('that product can be removed from the basket', () => {
  basket.removeProduct(mockProduct.name);
  // assert that products amount decreased
  expect(basket.get().products.length).toEqual(1);
  //assert that basket total price is correct after removal
  expect(basket.get().total).toEqual(342);
});

test('does basket.applyDiscount for amount work', () => {
  basket.applyDiscount(20, false);
  //assert that price is correct after discount for amount
  expect(basket.get().total).toEqual(322);
});

test('does basket.applyDiscount for percentage work', () => {
  basket.applyDiscount(20, );
  //assert that price is correct after discount for percentage
  expect(basket.get().total).toEqual(257.6);
});

test('if basket can be cleared ', () => {
  basket.clear();
  //assert that basket amount is zero
  expect(basket.get().products.length).toEqual(0);
  //assert that total price is zero
  expect(basket.get().total).toEqual(0);
});
