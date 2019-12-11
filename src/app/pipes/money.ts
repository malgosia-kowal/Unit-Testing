import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "money" })
export class MoneyPipe implements PipeTransform {
  transform(value: number): string {
    return (value / 100).toFixed(2).replace(".", ",");
  }
}
