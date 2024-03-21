/// <reference types="projects/ngx-intl-tel-input/node_modules/@types/google-libphonenumber" />
import { CountryCode } from '../data/country-code';
import { Country } from '../model/country.model';
import * as lpn from 'google-libphonenumber';
import { SearchCountryField } from '../enums/search-country-field.enum';
import * as i0 from "@angular/core";
export declare class NgxIntlTelInputService {
    private readonly countryCodeData;
    allCountries: Country[];
    private readonly phoneUtil;
    constructor(countryCodeData: CountryCode);
    fetchCountryData(enablePlaceholder: boolean): Country[];
    setCountries(countries: string[]): void;
    protected getPhoneNumberPlaceHolder(countryCode: string): string;
    getPreferredCountries(preferredCountries: string[]): Country[];
    getCountryIsoCode(countryCode: number, number: lpn.PhoneNumber): string | undefined;
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     */
    searchCountry(searchText: string, searchCountryField: SearchCountryField[]): Country[];
    onInputKeyPress(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelInputService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxIntlTelInputService>;
}
