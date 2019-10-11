Product = require('../entity/Product');
const faker = require('faker');

const createProduct = (data = {}) => new Product(data.hasOwnProperty('name') ? data.name : faker.commerce.productName(), parseInt(faker.commerce.price()), 1, faker.commerce.color());

module.exports = createProduct;

