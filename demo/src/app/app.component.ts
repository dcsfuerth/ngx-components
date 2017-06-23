import { Component } from '@angular/core';

@Component({
  selector: 'dcs-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    console.log('Loaded demo app!');
  }
}
