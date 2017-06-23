import { Component, OnInit } from '@angular/core';
import * as loremIpsum from 'lorem-ipsum';

@Component({
  selector: 'dcs-foo',
  styleUrls: ['./foo.component.scss'],
  templateUrl: './foo.component.html',
})
export class FooComponent implements OnInit {
  public content: string;
  private bar: number = 37;

  public ngOnInit() {
    this.content = loremIpsum();
  }

  get sense(): number {
    return this.bar + 5;
  }
}
