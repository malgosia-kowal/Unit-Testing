const basket = require('./Basket');
const Product = require('../entity/Product');
const createProduct = require('../factory/Product');

const invalidProduct = ['cream', 342, '6', 7];

describe('basket', () => {
  beforeEach(() => {
    basket.clear();
  });

  it('should check if basket is empty at the start', () => {
    expect(basket.get().products.length).toEqual(0);
    expect(basket.get().total).toEqual(0);
  });

  it('should add product to the basket', () => {
    const product = createProduct();

    basket.addProduct(product);

    expect(basket.get().products.length).toEqual(1);
    expect(basket.get().total).toEqual(product.price);
  });

  it('should add more products to the basket and check price and amount', () => {
    const product = createProduct();
    const product2 = createProduct();

    basket.addProduct(product);
    basket.addProduct(product2);

    expect(basket.get().products.length).toEqual(2);
    expect(basket.get().total).toEqual(product.price + product2.price);
  });

  it('should increment products count when adding the same product name but different size', () => {
    const product = createProduct();
    const product2 = createProduct({ name: product.name });
    
    basket.addProduct(product);
    basket.addProduct(product2);

    expect(basket.get().products.length).toEqual(2);
    expect(product.quantity).toEqual(1);
  });

  it('should add the same product and increment its quantity', () => {
    const product = createProduct();

    basket.addProduct(product);
    basket.addProduct(product);

    expect(basket.get().products.length).toEqual(1);
    expect(product.quantity).toEqual(2);
  });

  it('should remove product from the basket and change products price and amount', () => {
    const product = createProduct();
    const product2 = createProduct();

    basket.addProduct(product);
    basket.addProduct(product2);
    basket.removeProduct(product.name, product.size);

    expect(basket.get().products.length).toEqual(1);
    expect(basket.get().total).toEqual(product2.price);
  });

  it('should decrement product quantity when removed the same product', () => {
    const product = createProduct();
    
    basket.addProduct(product);
    basket.addProduct(product);
    basket.removeProduct(product.name, product.size);

    expect(product.quantity).toEqual(1);
  });

  it('should decrement basket count when removed the same product but different size', () => {
    const product = createProduct();
    const product2 = createProduct({ name: product.name });
    
    basket.addProduct(product);
    basket.addProduct(product2);
    basket.removeProduct(product.name, product.size);
    
    expect(basket.get().products.length).toEqual(1);
  });

  it('should apply a percentage discount on the price of the product', () => {
    const product = createProduct({ price: 100 });
    
    basket.addProduct(product);
    basket.applyDiscount(20);
    
    expect(basket.total).toEqual(80);
  });

  it('should apply amount discount for the product price', () => {
    const product = createProduct();
    const discountValue = 20;

    basket.addProduct(product);
    const totalBeforeDiscount = basket.total;
    basket.applyDiscount(discountValue, false);

    expect(basket.total).toEqual(totalBeforeDiscount - discountValue);
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
