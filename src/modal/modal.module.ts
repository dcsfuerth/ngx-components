import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal/modal.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalLayoutComponent } from './modal-layout/modal-layout.component';

@NgModule({
  declarations: [ModalComponent, ModalContainerComponent, ModalLayoutComponent],
  exports: [ModalComponent, ModalContainerComponent, ModalLayoutComponent],
  imports: [CommonModule],
})
export class ModalModule {}
