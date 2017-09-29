import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'dcs-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() public titleText: string = 'Modal title';
  @Input() public submitText: string = 'OK';
  @Input() public cancelText: string = 'Cancel';
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public onCancel: EventEmitter<any> = new EventEmitter();
  public visible: boolean = false;

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public submit() {
    this.hide();
    this.onSubmit.next();
  }

  public cancel() {
    this.hide();
    this.onCancel.next();
  }

  public toggle() {
    this.visible = !this.visible;
  }
}
