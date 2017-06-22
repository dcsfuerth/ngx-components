import { Component, OnInit } from '@angular/core';
import * as loremIpsum from 'lorem-ipsum';

@Component({
  selector: 'dcs-foo',
  styleUrls: ['./foo.component.css'],
  templateUrl: './foo.component.html'
})
export class FooComponent implements OnInit {
  private bar: number = 37;
  public content: string;

  ngOnInit() {
    this.content = loremIpsum();
  }

  get sense(): number {
    return this.bar + 5;
  }
}
