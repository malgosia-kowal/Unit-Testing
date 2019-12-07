import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { BehaviorSubject } from 'rxjs';
import currencyService from './currency.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Locale } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  total = 0;
  constructor(
    private translate: TranslateService
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event);
      const prevCurrency = this.translate.getLangs().filter(l => l !== event.lang)[0] || this.translate.getDefaultLang();
      console.log(prevCurrency);

      currencyService.convert(this.total, prevCurrency as Locale, event.lang as Locale).then(amount => {
        console.log(amount);
        this.total = amount;
      });
    });
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
