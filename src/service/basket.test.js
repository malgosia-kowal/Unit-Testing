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
<<<<<<< HEAD
    
});test('that multiple products can be added to basket', () => {
=======
});

test('that multiple products can be added to basket', () => {
>>>>>>> a3a324ceeefa5b686a59d48d6b7744262a7dbe50
  // todo: basket will already have a product inside from the previous test, we want to test that another product can be added

  // todo: assert that products amount increased
  // todo: assert that basket total price is correct
});

test('that product can be removed from the basket', () => {
  // todo: at this point basket will have 2 products, lets see if we can remove nikey product by calling basket.removeProduct(mockProduct)

  // todo: assert that products amount decreased
  // todo: assert that basket total price is correct after removal
});

//todo: write test to check basket.applyDiscount(20) works ?
//todo: write test to check basket.clear() works ?
<<<<<<< HEAD


  

=======
>>>>>>> a3a324ceeefa5b686a59d48d6b7744262a7dbe50
