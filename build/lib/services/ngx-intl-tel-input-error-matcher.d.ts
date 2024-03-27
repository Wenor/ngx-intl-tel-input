import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export declare class NgxIntlTelInputErrorMatcher implements ErrorStateMatcher {
    private customControl;
    constructor(customControl: FormControl);
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
}
