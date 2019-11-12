import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export enum Locale {
  Pl = 'pl',
  Gb = 'en',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Underground Cat Store (Meow)';
  locale;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(Locale.Gb);
    this.locale = Locale;
  }

  selectLocale(locale: Locale) {
    this.translate.use(locale);
  }
}
