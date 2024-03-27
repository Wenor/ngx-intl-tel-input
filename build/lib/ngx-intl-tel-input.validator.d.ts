import { FormControl } from '@angular/forms';
import { INgxIntlTelInputComponent } from './interfaces/ngx-intl-tel-input-component.interface';
import { NgxIntlTelModelAdapter } from './services/ngx-intl-tel-model-adapter';
export declare const phoneNumberValidator: (ngxIntlTelInputComponent: INgxIntlTelInputComponent, ngxIntlTelModelAdapter: NgxIntlTelModelAdapter<unknown>) => (control: FormControl) => {
    invalidPhoneNumber: string;
};
