import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from "rxjs";

export class MockCustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(require("../../../assets/i18n/en.json"));
  }
}
