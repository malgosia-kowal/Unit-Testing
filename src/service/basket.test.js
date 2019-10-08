const basket = require('./Basket');
const Product = require('../entity/Product');

const mockProduct = new Product('nikey', 1255, 1, '8');
const mockProduct2 = new Product('cream', 342, 1, '8');
const mockProductClone = new Product('nikey', 1255, 1, '5');
const invalidProduct = ['cream', 342, '6', 7];

describe('basket', () => {
  beforeEach(() => {
    basket.clear()
  });

  it('should check if basket is empty at the start', () => {
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
  });

  it('should add product to the basket', () => {
    basket.addProduct(mockProduct);

    expect(basket.get().products.length).toEqual(1);
    expect(basket.get().total).toEqual(1255);
  });

  it('should add more products to the basket and check price and amount', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(mockProduct2);

    expect(basket.get().products.length).toEqual(2);
    expect(basket.get().total).toEqual(1597);
  });

  it('should increment products amount when adding the same product but different size', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(mockProductClone);

    expect(basket.get().products.length).toEqual(2);
    expect(mockProduct.quantity).toEqual(1);
  });

  it('should add the same product and increment it quantity', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(mockProduct);

    expect(basket.get().products.length).toEqual(1);
    expect(mockProduct.quantity).toEqual(2);
  });

  it('product should have correct quantity for the start', () => {
    basket.addProduct(mockProduct);
    expect(mockProduct.quantity).toEqual(1)
  });

  it('should removed product from the basket and change products price and amount', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(mockProduct2);
    basket.removeProduct(mockProduct.name, mockProduct.size);

    expect(basket.get().products.length).toEqual(1);
    expect(basket.get().total).toEqual(342);
  });

  it('should decrement product quantity when removed the same product', () => {
    basket.addProduct(mockProduct);
    basket.addProduct(mockProduct);
    basket.removeProduct(mockProduct.name, mockProduct.size);

    expect(mockProduct.quantity).toEqual(1);
  });

  it('should apply amount discount for the product price', () => {
    basket.addProduct(mockProduct2);
    basket.applyDiscount(20, false);

    expect(basket.get().total).toEqual(322);
  });

  it('should apply a percentage discount on the price of the product', () => {
    basket.addProduct(mockProduct2);
    basket.applyDiscount(20);

    expect(basket.get().total).toEqual(273.6);
  });

  it('should clear the basket', () => {
    basket.clear();

    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
  });

  it('should throw the error when product is invalid', () => {
    expect(() => {
      basket.addProduct(invalidProduct);
    }).toThrow();
  });
});
