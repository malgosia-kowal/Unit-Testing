import { Injectable } from "@angular/core";
import { Product } from "../products/product";
import { BehaviorSubject } from "rxjs";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { getPreviousLang } from "../utils/translation";
import currencyService from "./currency.service";
import { Locale } from "../app.component";

const products: Product[] = [
  {
    name: "Pushkin",
    price: 100,
    quantity: 1,
    size: "red",
    image: "http://placekitten.com/250/300"
  },
  {
    name: "Pushkin",
    price: 123,
    quantity: 1,
    size: "grey",
    image: "http://placekitten.com/250/300"
  },
  {
    name: "Cuddle",
    price: 123,
    quantity: 1,
    size: "pink",
    image: "http://placekitten.com/250/300"
  },
  {
    name: "Charles",
    price: 123,
    quantity: 1,
    size: "ginger",
    image: "http://placekitten.com/250/300"
  }
];

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products: BehaviorSubject<Product[]> = new BehaviorSubject(products);

  constructor(private translate: TranslateService) {
    this.convertProductsPrice(this.translate, this.products);
  }

  getProducts(): BehaviorSubject<Product[]> {
    return this.products;
  }

  convertProductsPrice(
    translate: TranslateService,
    products: BehaviorSubject<Product[]>
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const previousLang = getPreviousLang(this.translate, event.lang);
      Promise.all(
        products.value.map(async product => {
          const price = await currencyService.convert(
            product.price,
            previousLang,
            event.lang as Locale
          );
          return { ...product, price };
        })
      ).then(p => products.next(p));
    });
  }
}
