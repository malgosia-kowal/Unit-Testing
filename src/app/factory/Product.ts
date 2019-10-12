import { Product } from '../entity/Product'; 
import * as faker from 'faker';

export const createProduct = (data: Partial<Product> = {}) => new Product(
    data.hasOwnProperty('name') ? data.name : faker.commerce.productName(), 
    data.hasOwnProperty('price') ? data.price : parseInt(faker.commerce.price()), 
    1, 
    data.hasOwnProperty('size') ? data.size : faker.commerce.color(),
    data.hasOwnProperty('image') ? data.image : faker.image.imageUrl(),
);
