import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  forwardRef,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as Flatpickr from 'flatpickr';
const de = require('flatpickr/dist/l10n/de.js').de;

export const DEFAULT_OPTIONS: Flatpickr.Options = {
  altInput: true,
  altFormat: 'j. F Y',
  time_24hr: true,
  altInputClass: 'flatpickr-alt-input form-control',
  locale: de,
};

export function addDays(date: Date, days: number = 1) {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function getDateRange(startDate: Date, stopDate: Date): Date[] {
  const dateArray = new Array();
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

export function getIsoDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export type PickerMode = 'single' | 'multiple' | 'range';

@Component({
  selector: 'dcs-datepicker',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
    },
  ],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  @Input() public options: Flatpickr.Options;
  public isDisabled: boolean = false;

  @ViewChild('dateInput') private dateInputRef: ElementRef;
  private flatpickr: Flatpickr;

  get dateInput(): HTMLInputElement {
    return this.dateInputRef.nativeElement;
  }

  get altInput(): HTMLInputElement {
    return this.elementRef.nativeElement.querySelector('input.flatpickr-alt-input');
  }

  /**
   * Flatpickr adds a native date input if it disvovers it is on a mobile device,
   * but only if certain conditions are met, see https://chmln.github.io/flatpickr/mobile-support/.
   *
   * @readonly
   * @type {HTMLInputElement}
   * @memberof DatepickerComponent
   */
  get mobileInput(): HTMLInputElement {
    return this.elementRef.nativeElement.querySelector('input.flatpickr-mobile');
  }

  get mergedOptions(): Flatpickr.Options {
    return Object.assign({}, DEFAULT_OPTIONS, this.options, {
      onChange: this.onPickerChange.bind(this),
      onClose: this.onTouched,
    });
  }

  get pickerMode(): PickerMode {
    return this.mergedOptions.mode || 'single';
  }

  get hasMultipleDates(): boolean {
    return this.pickerMode === 'multiple' || this.pickerMode === 'range';
  }

  constructor(private elementRef: ElementRef) {}

  // tslint:disable-next-line:no-empty
  public onTouched: () => void = () => {};
  // tslint:disable-next-line:no-empty
  public onChange: (_: any) => void = () => {};

  public ngOnInit(): void {
    this.flatpickr = new Flatpickr(this.dateInput, this.mergedOptions);
  }

  public writeValue(dates: string | string[]): void {
    if (!dates) {
      // do nothing
    } else if (this.pickerMode === 'single' && typeof dates !== 'string') {
      throw new TypeError('When pickerMode is single, you can not pass an Array of date strings!');
    }

    if (this.pickerMode === 'range' && dates) {
      dates = [dates[0], dates[dates.length - 1]];
    }
    this.flatpickr.setDate(dates);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn.bind(this);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn.bind(this);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.isDisabled) {
      this.mobileInput && this.mobileInput.setAttribute('disabled', 'disabled');
      this.altInput.setAttribute('disabled', 'disabled');
    } else {
      this.mobileInput && this.mobileInput.removeAttribute('disabled');
      this.altInput.removeAttribute('disabled');
    }
  }

  public onPickerChange(selectedDates: Date[]) {
    let dateStrings: string[] = [];

    switch (this.pickerMode) {
      case 'single':
      case 'multiple':
        dateStrings = selectedDates.map(getIsoDate);
        break;

      case 'range':
        const dates = getDateRange(selectedDates[0], selectedDates[1]);
        dateStrings = dates.map(getIsoDate);
        break;
    }

    // sometimes the first change triggers before the onChange is defined by angular, so make this async.
    setTimeout(() => {
      if (this.pickerMode === 'single') {
        this.onChange(dateStrings[0]);
      } else {
        this.onChange(dateStrings);
      }
    });
  }
}
