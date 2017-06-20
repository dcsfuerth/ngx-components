import { Component, OnInit } from '@angular/core';
import uuidv4 from 'uuid/v4';

@Component({
  selector: 'dcs-foo',
  styleUrls: ['./foo.component.css'],
  templateUrl: './foo.component.html'
})
export class FooComponent implements OnInit {
  private bar: number = 37;
  private uuid: string;

  ngOnInit() {
    this.uuid = uuidv4();
    console.log('onInit');
  }

  get sense(): number {
    return this.bar + 5;
  }
}
