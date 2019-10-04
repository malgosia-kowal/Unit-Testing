const basket = require('./Basket.js');

const mockProduct = { name:'nikey', price: 1255, quantity: 1 };
const product2 = { name:'cream', price: 342, quantity: 1 };


describe('basket', () => {
  it('that init basket can be returned', () => {
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
    beforeEach(() => {
        basket.clear() 
    });
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
});
