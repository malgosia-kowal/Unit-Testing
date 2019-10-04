const basket = require("./service/Basket");
const Product = require("./entity/Product");

const product = new Product('nikey', 1255, 1, '8');
const product2 = new Product('nikey', 1255, 1, '8.5');

basket.addProduct(product);
basket.addProduct(product);
basket.addProduct(product2);

console.log(basket.get());
// application runs here!
