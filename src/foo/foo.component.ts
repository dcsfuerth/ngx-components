import { Component, OnInit } from '@angular/core';
import * as uuidv4_ from 'uuid/v4';
import { v4 } from '@types/uuid/interfaces';

// thanks rollup, see https://github.com/rollup/rollup/issues/1267
const uuidv4: v4 = (<any>uuidv4_).default || uuidv4_;

@Component({
  selector: 'dcs-foo',
  styleUrls: ['./foo.component.css'],
  templateUrl: './foo.component.html'
})
export class FooComponent implements OnInit {
  private bar: number = 37;
  public uuid: string;

  ngOnInit() {
    this.uuid = uuidv4();
    console.log('onInit');
  }

  get sense(): number {
    return this.bar + 5;
  }
}
