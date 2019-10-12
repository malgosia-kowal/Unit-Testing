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

  isTheSameProduct(product: Product, otherProduct: Product | Partial<Product>): boolean {
    return product.name === otherProduct.name && product.size === otherProduct.size;
  }

  addProduct(product: Product): void {
    const existingProductWithTheSameSize =
      this.products.find(p => this.isTheSameProduct(p, product));

    if (existingProductWithTheSameSize) {
      this.products =
        this.products.map(p => {
          if (this.isTheSameProduct(p, existingProductWithTheSameSize)) {
            p.quantity = p.quantity + 1;
            return p;
          }
          return p;
        });
    } else {
      this.products.push(product);
    }
    this.total += product.price;
  }

  removeProduct(productName: string, productSize: string) {
    const existingProductWithTheSameSize =
      this.products.find(p =>
        this.isTheSameProduct(p, { name: productName, size: productSize })
      );

    if (existingProductWithTheSameSize && existingProductWithTheSameSize.quantity > 1) {
      this.products =
        this.products.map(p => {
          if (this.isTheSameProduct(p, existingProductWithTheSameSize)) {
            p.quantity = p.quantity - 1;
            return p;
          }
          return p;
        });
    } else {
      this.products = this.products.filter(p => !this.isTheSameProduct(p, { name: productName, size: productSize }));
    }

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
