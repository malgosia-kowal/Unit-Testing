import { Injectable } from "@angular/core";
import { Locale } from "../app.component";

// 3RD party service!

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  exchangeRate = {
    [Locale.Gb]: { [Locale.Pl]: 4.94 }
  };

  convert(value: number, from: Locale, to: Locale): Promise<number> {
    let result = value / 100;
    try {
      if (from !== to) {
        result = result * this.exchangeRate[from][to];
      }
    } catch (err) {
      result = result * (1 / this.exchangeRate[to][from]);
    }
    return new Promise(resolve =>
      setTimeout(() => resolve(Math.round(result * 100)), 750)
    );
  }
}

const currencyService = new CurrencyService();

export default currencyService;
