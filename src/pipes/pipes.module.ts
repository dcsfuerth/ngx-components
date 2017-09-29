import { NgModule } from '@angular/core';

import { NumeralPipe } from './numeral.pipe';

@NgModule({
  declarations: [NumeralPipe],
  exports: [NumeralPipe],
})
export class PipesModule {}
