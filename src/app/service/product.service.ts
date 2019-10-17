import { Injectable } from '@angular/core';
import { Product } from '../products/product';

const products: Product[] = [
  { name: 'Pushkin', price: 123, quantity: 1, size: 'red', image: 'http://placekitten.com/250/300' },
  { name: 'Pushkin', price: 123, quantity: 1, size: 'grey', image: 'http://placekitten.com/250/300' },
  { name: 'Cuddle', price: 123, quantity: 1, size: 'pink', image: 'http://placekitten.com/250/300' },
  { name: 'Charles', price: 123, quantity: 1, size: 'ginger', image: 'http://placekitten.com/250/300' },
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Product[] {
    return products;
  }
}
