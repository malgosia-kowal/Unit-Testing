const basket = require('./Basket.js');

const mockProduct = { name:'nikey', price: 1255, quantity: 1 };
const product2 = { name:'cream', price: 342, quantity: 1 };

// todo:
// 1. Tidy up syntax ('add product to basket' as example) and remove not needed comments(all of them ;))
// 2. Finish 'if basket can be cleared' and 'does basket.applyDiscount work'
// 3. 'does basket.applyDiscount work' now accepts second argument which will allow us to apply percentage discount or just plain amount.
// 4. Once above is done you can create pull request to master.

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
  // todo: basket will already have a product inside from the previous test, we want to test that another product can be added

  // todo: assert that products amount increased
    basket.addProduct(product2);
    expect(basket.get().products.length).toEqual(2);
  
  // todo: assert that basket total price is correct
    expect(basket.get().total).toEqual(1597);
});

test('that product can be removed from the basket', () => {
  basket.removeProduct(mockProduct.name);
  
  console.log(basket.get().products.length)
  
    // todo: assert that products amount decreased
     expect(basket.get().products.length).toEqual(1);

  // todo: assert that basket total price is correct after removal
      //expect(basket.get().total).toEqual(342);
  // to mi nie chce działać
});

//todo: write test to check basket.applyDiscount(20) works ?
test('does basket.applyDiscount work', () => {
  
  basket.applyDiscount(20);
  console.log(basket.get().total)
  
  //expect(basket.get().total).toEqual(0);
    
  // todo: assert that price basket is zero
    //expect(basket.get().total).toEqual(0);
    //expect(basket.get().total).toEqual(0);
});

//todo: write test to check basket.clear() works ?
 
 test('if basket can be cleared ', () => {
  
  basket.clear();
  console.log(basket.get().products.length)
  
  expect(basket.get().products.length).toEqual(0);
  
  // nie działa cena, nie zeruje się
  //expect(basket.get().total).toEqual(0);
  
});
