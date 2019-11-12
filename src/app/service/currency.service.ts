import { Injectable } from '@angular/core';
import { Locale } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  exchangeRate = {
    [`${Locale.Pl}-${Locale.Gb}`]: 4.94,
    [`${Locale.Gb}-${Locale.Pl}`]: 0.20,
  };

  convert(value: number, from: Locale, to: Locale): number {
    const rate = this.exchangeRate[`${from}-${to}`];
    if (rate) {
      value = Math.round(value / rate);
    }
    return value;
  }
}

const currencyService = new CurrencyService();

export default currencyService;
