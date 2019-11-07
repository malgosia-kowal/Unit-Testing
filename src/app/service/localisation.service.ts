import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export enum Locale {
  Pl = 'pl',
  Gb = 'gb',
}

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  locale: Subject<Locale> = new BehaviorSubject(Locale.Pl);

  setLocale(locale: Locale) {
    this.locale.next(locale);
  }
}
