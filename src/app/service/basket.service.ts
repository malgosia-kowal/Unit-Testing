import { Injectable } from '@angular/core';
import { Product } from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  products: Product[] = [];
  total: number = 0;
  constructor() { }

  addProduct(product:Product) {
    this.products.push(product);
    this.total += product.price;
  }
}
