import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dcs-demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      myDate: '2017-02-07',
      myDate2: '2017-02-07 23:08:12',
      myDate3: [['2017-02-07', '2017-02-12', '2017-02-15']],
      myDate4: [['2017-02-07', '2017-02-15']],
    });

    this.form.valueChanges.subscribe(data => {
      console.log('new form data', data);
    });
  }
  public saveTheWorld() {
    console.log('Saving the world!!!');
  }
}
