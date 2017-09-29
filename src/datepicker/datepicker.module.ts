import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatepickerComponent } from './datepicker.component';

@NgModule({
  declarations: [DatepickerComponent],
  providers: [],
  exports: [DatepickerComponent],
  imports: [CommonModule, FormsModule],
})
export class DatepickerModule {}
