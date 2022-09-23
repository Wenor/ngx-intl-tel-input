import {Injectable} from '@angular/core';
import {IntlTelModel} from '../../projects/ngx-intl-tel-input/src/lib/model/intl-tel.model';
import {NgxIntlTelModelAdapter} from '../../projects/ngx-intl-tel-input/src/lib/services/ngx-intl-tel-model-adapter';
import {PhoneModel} from './phone.model';

@Injectable()
export class NgxIntlTelModelAdapterService extends NgxIntlTelModelAdapter<PhoneModel> {

  controlValueToString(value: PhoneModel | null): string {
    return value ? `+${value.dialCode}${value.nationalNumber}` : '';
  }

  libPhoneNumberModelToControlValue(intlTelModel: IntlTelModel | null) {
    if (intlTelModel) {
      return {
        'nationalNumber': intlTelModel.number.replace(intlTelModel.dialCode, ''),
        'dialCode': intlTelModel.dialCode.replace('+', ''),
      };
    }
    return null;
  }

  getValidationValue(value: PhoneModel | null) {
    return (value && (value.dialCode || value.nationalNumber))
      ? this.controlValueToString(value) : '';
  }

}
