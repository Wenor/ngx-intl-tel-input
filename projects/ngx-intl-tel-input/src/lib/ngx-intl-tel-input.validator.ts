import {FormControl} from '@angular/forms';
import {PhoneNumber, PhoneNumberUtil} from 'google-libphonenumber';
import {INgxIntlTelInputComponent} from './interfaces/ngx-intl-tel-input-component.interface';
import {NgxIntlTelModelAdapter} from './services/ngx-intl-tel-model-adapter';

export const phoneNumberValidator = (ngxIntlTelInputComponent: INgxIntlTelInputComponent,
                                     ngxIntlTelModelAdapter: NgxIntlTelModelAdapter<unknown>) => {
  return (control: FormControl) => {
    if (!ngxIntlTelInputComponent.phoneValidation) {
      return null;
    }

    const error = {invalidPhoneNumber: 'Phone number is invalid'};
    const stringPhoneNumber: string = ngxIntlTelModelAdapter.getValidationValue(control.value);
    let phoneNumber: PhoneNumber;

    try {
      phoneNumber = PhoneNumberUtil.getInstance().parse(stringPhoneNumber);
    } catch (e) {}

    if (stringPhoneNumber) {
      if (phoneNumber) {
        const phoneUtil = PhoneNumberUtil.getInstance();
        if (!phoneUtil.isValidNumberForRegion(phoneNumber, phoneUtil.getRegionCodeForNumber(phoneNumber))) {
          return error;
        }
      } else {
        return error;
      }
    }

    return null;
  };
};
