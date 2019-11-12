import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



export enum Locale {
  Pl = 'pl',
  Gb = 'gb',
}

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  locale: BehaviorSubject<{ current: Locale, from: Locale }> =
    new BehaviorSubject({ current: Locale.Pl, from: Locale.Pl });

  setLocale(locale: Locale) {
    const currentLocale = this.locale.getValue().current;
    this.locale.next({ from: currentLocale, current: locale });
  }
}
