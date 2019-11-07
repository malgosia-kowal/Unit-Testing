import { Component } from '@angular/core';
import { LocalisationService, Locale } from './service/localisation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Underground Cat Store (Meow)';
  locale;

  constructor(public localisation: LocalisationService) {
    this.locale = Locale;
  }

  selectLocale(locale: Locale) {
    this.localisation.setLocale(locale);
  }
}
