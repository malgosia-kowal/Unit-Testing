import { Injectable } from '@angular/core';
import {Product} from "../products/product";

const products:Product[] = [
  { name:'nikey', price: 123, quantity: 1, size: '8', image: 'http://placekitten.com/200/300'},
  { name:'nikey', price: 123, quantity: 1, size: '8.5', image: 'http://placekitten.com/200/300'},
  { name:'rebook', price: 123, quantity: 1, size: '9', image: 'http://placekitten.com/200/300'},
  { name:'cream', price: 123, quantity: 1, size: '10', image: 'http://placekitten.com/200/300'},
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Product[] {
    return products;
  }
}
