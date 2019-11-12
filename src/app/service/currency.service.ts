import { Injectable } from '@angular/core';
import { LocalisationService, Locale } from './localisation.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  exchangeRate = {
    [`${Locale.Pl}-${Locale.Gb}`]: 4.94,
    [`${Locale.Gb}-${Locale.Pl}`]: 0.20,
  }

  localisationService: LocalisationService;

  constructor(localisationService: LocalisationService) {
    this.localisationService = localisationService;
  }

  convert(value: number, locale: { current: Locale, from: Locale }): number {
    const rate = this.exchangeRate[`${locale.from}-${locale.current}`];
    if (rate) {
      value = Math.round(value / rate);
    }
    return value;
  }
}

const currencyService = new CurrencyService(new LocalisationService());

export default currencyService;
