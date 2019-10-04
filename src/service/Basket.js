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
