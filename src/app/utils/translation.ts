import { TranslateService } from "@ngx-translate/core";
import { Locale } from "../app.component";

export const getPreviousLang = (
  translate: TranslateService,
  lang: string
): Locale => {
  return (translate.getLangs().filter(l => l !== lang)[0] ||
    translate.getDefaultLang()) as Locale;
};
