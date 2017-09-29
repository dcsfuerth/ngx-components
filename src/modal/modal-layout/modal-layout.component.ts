import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dcs-modal-layout',
  styleUrls: ['./modal-layout.component.scss'],
  templateUrl: './modal-layout.component.html',
})
export class ModalLayoutComponent {
  @Input() public submitText: string = '';
  @Input() public cancelText: string = '';
  @Input() public titleText: string = '';
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public onCancel: EventEmitter<any> = new EventEmitter();
}
