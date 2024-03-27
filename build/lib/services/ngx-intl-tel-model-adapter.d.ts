import { IntlTelModel } from '../model/intl-tel.model';
import * as i0 from "@angular/core";
export declare abstract class NgxIntlTelModelAdapter<T> {
    /**
     * Transform form control value to string phone number
     * @param value
     */
    abstract controlValueToString(value: T): string;
    /**
     * Transform internal phone number model to form control value
     * @param intlTelModel
     */
    abstract libPhoneNumberModelToControlValue(intlTelModel: IntlTelModel | null): T;
    /**
     * Validation value used in phone number validator
     * @param value
     */
    abstract getValidationValue(value: T): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelModelAdapter<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxIntlTelModelAdapter<any>>;
}
