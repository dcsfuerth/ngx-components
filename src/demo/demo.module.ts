import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoComponent } from './demo.component';
import { FooModule } from './../foo/foo.module';

@NgModule({
  declarations: [DemoComponent],
  exports: [DemoComponent],
  imports: [CommonModule, FooModule],
})
export class DemoModule {}
