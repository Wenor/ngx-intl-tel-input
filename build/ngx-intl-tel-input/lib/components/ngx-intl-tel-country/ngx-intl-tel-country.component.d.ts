import { EventEmitter } from '@angular/core';
import { Country } from '../../model/country.model';
import { CountryDropdownDisplayOptions } from '../../enums/country-dropdown-display-options.enum';
import * as i0 from "@angular/core";
export declare class NgxIntlTelCountryComponent {
    countries: Country[];
    dropdownParams: CountryDropdownDisplayOptions[];
    stroked: boolean;
    countryClick: EventEmitter<Country>;
    get showFlag(): boolean;
    get showName(): boolean;
    get showDial(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelCountryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxIntlTelCountryComponent, "ngx-intl-tel-country", never, { "countries": { "alias": "countries"; "required": false; }; "dropdownParams": { "alias": "dropdownParams"; "required": false; }; "stroked": { "alias": "stroked"; "required": false; }; }, { "countryClick": "countryClick"; }, never, never, false, never>;
}
