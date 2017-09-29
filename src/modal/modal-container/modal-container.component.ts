import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dcs-modal-container',
  styleUrls: ['./modal-container.component.scss'],
  templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent {
  @Input() public visible: boolean = true;
  @Output() public onCancel: EventEmitter<any> = new EventEmitter();

  @HostListener('document:keyup', ['$event'])
  public closeOnEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.onCancel.next();
    }
  }

  @HostListener('click', ['$event'])
  public closeOnBackdropClick(event: MouseEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('modal-background')) {
      this.onCancel.next();
    }
  }
}
