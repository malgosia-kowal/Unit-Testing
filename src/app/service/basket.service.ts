import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { BehaviorSubject } from 'rxjs';
import { CurrencyService } from './currency.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  total: number = 0;
  currencyService: CurrencyService;
  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
    currencyService.convert(this.total).subscribe(price => console.log(price));
  }

  get() {
    return this;
  }

  isTheSameProduct(product: Product, otherProduct: Product | Partial<Product>): boolean {
    return product.name === otherProduct.name && product.size === otherProduct.size;
  }

  addProduct(product: Product): void {
    const existingProductWithTheSameSize =
      this.products.value.find(p => this.isTheSameProduct(p, product));

    if (existingProductWithTheSameSize) {
      this.products.next(
        this.products.value.map(p => {
          if (this.isTheSameProduct(p, existingProductWithTheSameSize)) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        }));
    } else {
      this.products.next(this.products.value.concat(product));
    }
    this.total += product.price;
  }

  removeProduct(productName: string, productSize: string) {
    const existingProductWithTheSameSize =
      this.products.value.find(p =>
        this.isTheSameProduct(p, { name: productName, size: productSize })
      );

    if (existingProductWithTheSameSize && existingProductWithTheSameSize.quantity > 1) {
      this.products.next(
        this.products.value.map(p => {
          if (this.isTheSameProduct(p, existingProductWithTheSameSize)) {
            p.quantity = p.quantity - 1;
            return p;
          }
          return p;
        }));
    } else {
      this.products.next(
        this.products
          .value
          .filter(p => !this.isTheSameProduct(p, { name: productName, size: productSize }))
      );
    }

    this.total =
      this.products.value.reduce((total, product) =>
        total + (product.price * product.quantity), 0);
  }

  applyDiscount(discountAmount, percent = true) {
    if (percent) {
      this.total -= this.total * (discountAmount / 100);
    } else {
      this.total -= discountAmount;
    }
  }

  clear() {
    this.products.next([]);
    this.total = 0;
  }
}
