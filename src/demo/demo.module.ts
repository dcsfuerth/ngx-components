import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoComponent } from './demo.component';
import { FooModule } from './../foo/foo.module';
import { ModalModule } from '../modal/modal.module';
import { PipesModule } from '../pipes/pipes.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DemoComponent],
  exports: [DemoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FooModule,
    ModalModule,
    PipesModule,
    DatepickerModule,
  ],
})
export class DemoModule {}
