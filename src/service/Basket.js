class Basket {

  constructor(){
    this.products = [];
    this.total = 0;
  }

  get() {
    return this;
  }

  addProduct(product) {
    this.products.push(product);
    this.total += product.price;
  }

  removeProduct(productName) {
    this.products = this.products.filter(p => p.name !== productName);
  }

  applyDiscount(discountAmount) {
    this.total -= this.total / discountAmount;
  }

  clear() {
    this.products = [];
  }

}

const basket = new Basket();

module.exports = basket;
