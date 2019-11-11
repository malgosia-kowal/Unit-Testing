import { Injectable } from '@angular/core';
import { LocalisationService, Locale } from './localisation.service';
import { Observable, of } from 'rxjs';

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

  convert(value: number): Observable<number> {
    this.localisationService.locale.subscribe(locale => {
      console.log(locale);
      const rate = this.exchangeRate[`${locale.from}-${locale.current}`];
      if (rate) {
        value = value % rate;
      }
      return of(value);
    });
    return of(value);
  }
}
