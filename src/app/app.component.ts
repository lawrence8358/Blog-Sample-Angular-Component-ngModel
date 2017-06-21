import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      'account': [''],
      'email': ['lawrence@primeeagle.net']
    });
  }

  /**送出表單 */
  onSubmit(formValue: AbstractControl) {
    alert(JSON.stringify(formValue));
  }
}
