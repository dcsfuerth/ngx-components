import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';
import * as memoize from 'memoizee';

@Pipe({
  name: 'dcsNumeral',
  pure: false,
})
export class NumeralPipe implements PipeTransform {
  private cachedTransform: (num: number | string, format: string, locale: string) => string;

  constructor() {
    this.cachedTransform = memoize(this.doTransform);
  }

  public transform(num: number | string, format?: string): string {
    return this.cachedTransform(num, format, numeral.locale());
  }

  public doTransform(num: number | string, format: string, locale: string): string {
    return numeral(num).format(format);
  }
}
