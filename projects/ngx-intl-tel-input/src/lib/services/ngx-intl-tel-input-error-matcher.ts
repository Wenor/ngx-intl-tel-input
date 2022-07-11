import {ErrorStateMatcher} from '@angular/material/core';
import {UntypedFormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class NgxIntlTelInputErrorMatcher implements ErrorStateMatcher {
  constructor(private customControl: UntypedFormControl) {
  }

  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(this.customControl && this.customControl.invalid
      && ((this.customControl.dirty && this.customControl.touched) || isSubmitted));
  }
}
