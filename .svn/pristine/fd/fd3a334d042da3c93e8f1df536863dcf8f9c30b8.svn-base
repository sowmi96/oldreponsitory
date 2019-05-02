import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../shared.service';
import { CurrencyPipe } from '@angular/common';

@Pipe({ name: 'currConvert' })
export class CurrConvertPipe implements PipeTransform {
  constructor(private ss: SharedService) {}

  transform(value: number, currencyRate: number): string {
    const baseRate = this.ss.getCurrencyRate();
    const baseCurrSymbol = this.ss.getCurrencyCode();
    const outputRate = 1;
    const amount = (value / baseRate) * outputRate;

    const formatAmount = new CurrencyPipe('en-US').transform(
      amount,
      baseCurrSymbol,
      true
    );
    return formatAmount;
  }
}
