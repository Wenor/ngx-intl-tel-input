import {UntypedFormControl} from '@angular/forms';
import * as lpn from 'google-libphonenumber';
import {NgxIntlTelModelAdapter} from './services/ngx-intl-tel-model-adapter';

export const phoneNumberValidator = (ngxIntlTelModelAdapter: NgxIntlTelModelAdapter) => {
  return (control: UntypedFormControl) => {
    const id = control && control.value && control.value.id ? control.value.id : 'phone';
    const input = document.getElementById(id);
    if (!input) {
      return;
    }
    const isCheckValidation = document.getElementById(id).getAttribute('validation');
    if (isCheckValidation === 'true') {
      const isRequired = control.errors && control.errors.required === true;
      const error = {invalidPhoneNumber: 'Phone number is invalid'};
      let number: lpn.PhoneNumber;

      try {
        const validationModel = ngxIntlTelModelAdapter.valueToString(control.value);
        number = lpn.PhoneNumberUtil.getInstance().parse(validationModel);
      } catch (e) {
        if (isRequired === true) {
          return error;
        }
      }

      if (control.value) {
        if (!number) {
          return error;
        } else {
          const phoneUtil = lpn.PhoneNumberUtil.getInstance();
          if (!phoneUtil.isValidNumberForRegion(number, phoneUtil.getRegionCodeForNumber(number))) {
            return error;
          }
        }
      }
    } else if (isCheckValidation === 'false') {
      control.clearValidators();
    }
    return;

  };
};

