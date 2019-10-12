Product = require('../entity/Product');
const faker = require('faker');

const createProduct = (data = {}) => new Product(
    data.hasOwnProperty('name') ? data.name : faker.commerce.productName(), 
    data.hasOwnProperty('price') ? data.price : parseInt(faker.commerce.price()), 
    1, 
    data.hasOwnProperty('size') ? data.size : faker.commerce.color()
);

module.exports = createProduct;