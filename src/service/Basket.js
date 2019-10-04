const Product = require('../entity/Product');

class Basket {

  constructor() {
    this.products = [];
    this.total = 0;
  }

  get() {
    return this;
  }

  isTheSameProduct(product, otherProduct) {
    return product.name === otherProduct.name && product.size === otherProduct.size;
  }

  addProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error('Argument must be a valid product');
    }

    const existingProductWithTheSameSize =
      this.products.find(p => this.isTheSameProduct(p, product));

    if (existingProductWithTheSameSize) {
      this.products =
        this.products.map(p => {
          if (this.isTheSameProduct(p, existingProductWithTheSameSize)) {
            p.quantity = p.quantity + 1;
            return p;
          }
          return p;
        });
    } else {
      this.products.push(product);
    }
    this.total += product.price;
  }

  removeProduct(productName) {
    this.products = this.products.filter(p => p.name !== productName);
    this.total = this.products.reduce((total, product) => total + product.price, 0);
  }

  applyDiscount(discountAmount, percent = true) {
    if (percent) {
      this.total -= this.total * (discountAmount / 100);
    } else {
      this.total -= discountAmount;
    }
  }

  clear() {
    this.products = [];
    this.total = 0;
  }

}

const basket = new Basket();

module.exports = basket;
