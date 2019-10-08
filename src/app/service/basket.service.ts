import { Injectable } from '@angular/core';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  products: Product[] = [];
  total: number = 0;
  constructor() { }

  get() {
    return this;
  }

  addProduct(product: Product) {
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
