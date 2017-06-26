import { Component, OnInit, Input } from '@angular/core';
import * as loremIpsum from 'lorem-ipsum';

@Component({
  selector: 'dcs-foo',
  styleUrls: ['./foo.component.scss'],
  templateUrl: './foo.component.html',
})
export class FooComponent implements OnInit {
  @Input() public bar: number = 37;
  public content: string;

  public ngOnInit() {
    this.content = loremIpsum();
  }

  get sense(): number {
    return this.bar + 5;
  }
}
