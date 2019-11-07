import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  async convert(price: number): Promise<number> {
    console.log(price);
    return price;
  }
}
