import { NgModule } from '@angular/core';
import { DatepickerModule } from './datepicker/datepicker.module';
import { FooModule } from './foo/foo.module';
import { ModalModule } from './modal/modal.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  exports: [DatepickerModule, FooModule, ModalModule, PipesModule],
})
export class NgxComponentsModule {}
