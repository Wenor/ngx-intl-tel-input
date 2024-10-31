import { Injectable } from '@angular/core';
import { CountryCode } from '../data/country-code';
import * as lpn from 'google-libphonenumber';
import { SearchCountryField } from '../enums/search-country-field.enum';
import * as i0 from "@angular/core";
import * as i1 from "../data/country-code";
export class NgxIntlTelInputService {
    constructor(countryCodeData) {
        this.countryCodeData = countryCodeData;
        this.allCountries = [];
        // Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
        this.phoneUtil = lpn.PhoneNumberUtil.getInstance();
    }
    fetchCountryData(enablePlaceholder) {
        this.countryCodeData.allCountries.forEach(c => {
            const country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: c[4] || undefined,
                flagClass: `iti__flag iti__${c[1].toString().toLocaleLowerCase()}`,
                placeHolder: ''
            };
            if (enablePlaceholder) {
                country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            this.allCountries.push(country);
        });
        return this.allCountries;
    }
    setCountries(countries) {
        this.allCountries = this.allCountries.filter(c => countries.includes(c.iso2));
    }
    getPhoneNumberPlaceHolder(countryCode) {
        try {
            return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
        }
        catch (e) {
            return e;
        }
    }
    getPreferredCountries(preferredCountries) {
        if (!preferredCountries.length) {
            return null;
        }
        return preferredCountries.map(iso2 => {
            return this.allCountries.find((c) => {
                return c.iso2 === iso2;
            });
        });
    }
    getCountryIsoCode(countryCode, number) {
        // Will use this to match area code from the first numbers
        const rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        const countries = this.allCountries.filter(c => c.dialCode === countryCode.toString());
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        const mainCountry = countries.find(c => c.areaCodes === undefined);
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        const secondaryCountries = countries.filter(c => c.areaCodes !== undefined);
        let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
        /*
          Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
          If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach(country => {
            country.areaCodes.forEach(areaCode => {
                if (rawNumber.startsWith(areaCode)) {
                    matchedCountry = country.iso2;
                }
            });
        });
        return matchedCountry;
    }
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     */
    searchCountry(searchText, searchCountryField) {
        if (!searchText) {
            return [];
        }
        const countrySearchTextLower = searchText.toLowerCase();
        return this.allCountries.filter(c => {
            if (searchCountryField.indexOf(SearchCountryField.All) > -1) {
                // Search in all fields
                if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.dialCode.startsWith(searchText)) {
                    return c;
                }
            }
            else {
                // Or search by specific SearchCountryField(s)
                if (searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (searchCountryField.indexOf(SearchCountryField.Name) > -1) {
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
                    if (c.dialCode.startsWith(searchText)) {
                        return c;
                    }
                }
            }
        });
    }
    onInputKeyPress(event) {
        const allowedChars = /[\d\s+-]/;
        const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
        const allowedOtherKeys = [
            'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
            'Home', 'End', 'Insert', 'Delete', 'Backspace', 'Tab'
        ];
        if (!allowedChars.test(event.key)
            && !((event.ctrlKey || event.metaKey) && allowedCtrlChars.test(event.key))
            && !(allowedOtherKeys.includes(event.key))) {
            event.preventDefault();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputService, deps: [{ token: i1.CountryCode }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.CountryCode }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW50bC10ZWwtaW5wdXQvc3JjL2xpYi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtaW5wdXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRCxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDOzs7QUFLdEUsTUFBTSxPQUFPLHNCQUFzQjtJQU9qQyxZQUE2QixlQUE0QjtRQUE1QixvQkFBZSxHQUFmLGVBQWUsQ0FBYTtRQUx6RCxpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUU3QixtR0FBbUc7UUFDbEYsY0FBUyxHQUFRLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFHcEUsQ0FBQztJQUVELGdCQUFnQixDQUFDLGlCQUEwQjtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUMsTUFBTSxPQUFPLEdBQVk7Z0JBQ3ZCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNyQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNwQixTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBYSxJQUFJLFNBQVM7Z0JBQ3hDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ2xFLFdBQVcsRUFBRSxFQUFFO2FBQ2hCLENBQUM7WUFDRixJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNuRixDQUFDO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELFlBQVksQ0FBQyxTQUFtQjtRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRVMseUJBQXlCLENBQUMsV0FBbUI7UUFDckQsSUFBSSxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsSCxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxrQkFBNEI7UUFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsTUFBdUI7UUFDNUQsMERBQTBEO1FBQzFELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRCw2R0FBNkc7UUFDN0csTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLHlGQUF5RjtRQUN6RixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUNuRSxpR0FBaUc7UUFDakcsTUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUM1RSxJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUVoRTs7O1VBR0U7UUFDRixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ25DLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUNuQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDaEMsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhLENBQUMsVUFBa0IsRUFBRSxrQkFBd0M7UUFDeEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sc0JBQXNCLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RDLE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sOENBQThDO2dCQUM5QyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUM3RCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQzt3QkFDNUQsT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDSCxDQUFDO2dCQUNELElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQzdELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDO3dCQUM1RCxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNILENBQUM7Z0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDakUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO3dCQUN0QyxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQW9CO1FBQ2xDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQjtRQUN6RCxNQUFNLGdCQUFnQixHQUFHO1lBQ3ZCLFdBQVcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVc7WUFDakQsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLO1NBQ3RELENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2VBQzVCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7ZUFDdkUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQzsrR0FySVUsc0JBQXNCO21IQUF0QixzQkFBc0IsY0FGckIsTUFBTTs7NEZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q291bnRyeUNvZGV9IGZyb20gJy4uL2RhdGEvY291bnRyeS1jb2RlJztcclxuaW1wb3J0IHtDb3VudHJ5fSBmcm9tICcuLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcclxuaW1wb3J0ICogYXMgbHBuIGZyb20gJ2dvb2dsZS1saWJwaG9uZW51bWJlcic7XHJcbmltcG9ydCB7U2VhcmNoQ291bnRyeUZpZWxkfSBmcm9tICcuLi9lbnVtcy9zZWFyY2gtY291bnRyeS1maWVsZC5lbnVtJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEludGxUZWxJbnB1dFNlcnZpY2Uge1xyXG5cclxuICBhbGxDb3VudHJpZXM6IENvdW50cnlbXSA9IFtdO1xyXG5cclxuICAvLyBIYXMgdG8gYmUgJ2FueScgdG8gcHJldmVudCBhIG5lZWQgdG8gaW5zdGFsbCBAdHlwZXMvZ29vZ2xlLWxpYnBob25lbnVtYmVyIGJ5IHRoZSBwYWNrYWdlIHVzZXIuLi5cclxuICBwcml2YXRlIHJlYWRvbmx5IHBob25lVXRpbDogYW55ID0gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNvdW50cnlDb2RlRGF0YTogQ291bnRyeUNvZGUpIHtcclxuICB9XHJcblxyXG4gIGZldGNoQ291bnRyeURhdGEoZW5hYmxlUGxhY2Vob2xkZXI6IGJvb2xlYW4pOiBDb3VudHJ5W10ge1xyXG4gICAgdGhpcy5jb3VudHJ5Q29kZURhdGEuYWxsQ291bnRyaWVzLmZvckVhY2goYyA9PiB7XHJcbiAgICAgIGNvbnN0IGNvdW50cnk6IENvdW50cnkgPSB7XHJcbiAgICAgICAgbmFtZTogY1swXS50b1N0cmluZygpLFxyXG4gICAgICAgIGlzbzI6IGNbMV0udG9TdHJpbmcoKSxcclxuICAgICAgICBkaWFsQ29kZTogY1syXS50b1N0cmluZygpLFxyXG4gICAgICAgIHByaW9yaXR5OiArY1szXSB8fCAwLFxyXG4gICAgICAgIGFyZWFDb2RlczogY1s0XSBhcyBzdHJpbmdbXSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgZmxhZ0NsYXNzOiBgaXRpX19mbGFnIGl0aV9fJHtjWzFdLnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKX1gLFxyXG4gICAgICAgIHBsYWNlSG9sZGVyOiAnJ1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoZW5hYmxlUGxhY2Vob2xkZXIpIHtcclxuICAgICAgICBjb3VudHJ5LnBsYWNlSG9sZGVyID0gdGhpcy5nZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5hbGxDb3VudHJpZXMucHVzaChjb3VudHJ5KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuYWxsQ291bnRyaWVzO1xyXG4gIH1cclxuXHJcbiAgc2V0Q291bnRyaWVzKGNvdW50cmllczogc3RyaW5nW10pOiB2b2lkIHtcclxuICAgIHRoaXMuYWxsQ291bnRyaWVzID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4gY291bnRyaWVzLmluY2x1ZGVzKGMuaXNvMikpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeUNvZGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gdGhpcy5waG9uZVV0aWwuZm9ybWF0KHRoaXMucGhvbmVVdGlsLmdldEV4YW1wbGVOdW1iZXIoY291bnRyeUNvZGUpLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0UHJlZmVycmVkQ291bnRyaWVzKHByZWZlcnJlZENvdW50cmllczogc3RyaW5nW10pOiBDb3VudHJ5W10ge1xyXG4gICAgaWYgKCFwcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZWZlcnJlZENvdW50cmllcy5tYXAoaXNvMiA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFsbENvdW50cmllcy5maW5kKChjKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGMuaXNvMiA9PT0gaXNvMjtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvdW50cnlJc29Db2RlKGNvdW50cnlDb2RlOiBudW1iZXIsIG51bWJlcjogbHBuLlBob25lTnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIC8vIFdpbGwgdXNlIHRoaXMgdG8gbWF0Y2ggYXJlYSBjb2RlIGZyb20gdGhlIGZpcnN0IG51bWJlcnNcclxuICAgIGNvbnN0IHJhd051bWJlciA9IG51bWJlclsndmFsdWVzXyddWycyJ10udG9TdHJpbmcoKTtcclxuICAgIC8vIExpc3Qgb2YgYWxsIGNvdW50cmllcyB3aXRoIGNvdW50cnlDb2RlIChjYW4gYmUgbW9yZSB0aGFuIG9uZS4gZS54LiBVUywgQ0EsIERPLCBQUiBhbGwgaGF2ZSArMSBjb3VudHJ5Q29kZSlcclxuICAgIGNvbnN0IGNvdW50cmllcyA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IGMuZGlhbENvZGUgPT09IGNvdW50cnlDb2RlLnRvU3RyaW5nKCkpO1xyXG4gICAgLy8gTWFpbiBjb3VudHJ5IGlzIHRoZSBjb3VudHJ5LCB3aGljaCBoYXMgbm8gYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cclxuICAgIGNvbnN0IG1haW5Db3VudHJ5ID0gY291bnRyaWVzLmZpbmQoYyA9PiBjLmFyZWFDb2RlcyA9PT0gdW5kZWZpbmVkKTtcclxuICAgIC8vIFNlY29uZGFyeSBjb3VudHJpZXMgYXJlIGFsbCBjb3VudHJpZXMsIHdoaWNoIGhhdmUgYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cclxuICAgIGNvbnN0IHNlY29uZGFyeUNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoYyA9PiBjLmFyZWFDb2RlcyAhPT0gdW5kZWZpbmVkKTtcclxuICAgIGxldCBtYXRjaGVkQ291bnRyeSA9IG1haW5Db3VudHJ5ID8gbWFpbkNvdW50cnkuaXNvMiA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKlxyXG4gICAgICBJdGVyYXRlIG92ZXIgZWFjaCBzZWNvbmRhcnkgY291bnRyeSBhbmQgY2hlY2sgaWYgbmF0aW9uYWxOdW1iZXIgc3RhcnRzIHdpdGggYW55IG9mIGFyZWFDb2RlcyBhdmFpbGFibGUuXHJcbiAgICAgIElmIG5vIG1hdGNoZXMgZm91bmQsIGZhbGxiYWNrIHRvIHRoZSBtYWluIGNvdW50cnkuXHJcbiAgICAqL1xyXG4gICAgc2Vjb25kYXJ5Q291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiB7XHJcbiAgICAgIGNvdW50cnkuYXJlYUNvZGVzLmZvckVhY2goYXJlYUNvZGUgPT4ge1xyXG4gICAgICAgIGlmIChyYXdOdW1iZXIuc3RhcnRzV2l0aChhcmVhQ29kZSkpIHtcclxuICAgICAgICAgIG1hdGNoZWRDb3VudHJ5ID0gY291bnRyeS5pc28yO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbWF0Y2hlZENvdW50cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWFyY2ggY291bnRyeSBiYXNlZCBvbiBjb3VudHJ5IG5hbWUsIGlzbzIsIGRpYWxDb2RlIG9yIGFsbCBvZiB0aGVtLlxyXG4gICAqL1xyXG4gIHNlYXJjaENvdW50cnkoc2VhcmNoVGV4dDogc3RyaW5nLCBzZWFyY2hDb3VudHJ5RmllbGQ6IFNlYXJjaENvdW50cnlGaWVsZFtdKTogQ291bnRyeVtdIHtcclxuICAgIGlmICghc2VhcmNoVGV4dCkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb3VudHJ5U2VhcmNoVGV4dExvd2VyID0gc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IHtcclxuICAgICAgaWYgKHNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5BbGwpID4gLTEpIHtcclxuICAgICAgICAvLyBTZWFyY2ggaW4gYWxsIGZpZWxkc1xyXG4gICAgICAgIGlmIChjLmlzbzIudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XHJcbiAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuICAgICAgICAgIHJldHVybiBjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHNlYXJjaFRleHQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gT3Igc2VhcmNoIGJ5IHNwZWNpZmljIFNlYXJjaENvdW50cnlGaWVsZChzKVxyXG4gICAgICAgIGlmIChzZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuSXNvMikgPiAtMSkge1xyXG4gICAgICAgICAgaWYgKGMuaXNvMi50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuTmFtZSkgPiAtMSkge1xyXG4gICAgICAgICAgaWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuRGlhbENvZGUpID4gLTEpIHtcclxuICAgICAgICAgIGlmIChjLmRpYWxDb2RlLnN0YXJ0c1dpdGgoc2VhcmNoVGV4dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uSW5wdXRLZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgYWxsb3dlZENoYXJzID0gL1tcXGRcXHMrLV0vO1xyXG4gICAgY29uc3QgYWxsb3dlZEN0cmxDaGFycyA9IC9bYXhjdl0vOyAvLyBBbGxvd3MgY29weS1wYXN0aW5nXHJcbiAgICBjb25zdCBhbGxvd2VkT3RoZXJLZXlzID0gW1xyXG4gICAgICAnQXJyb3dMZWZ0JywgJ0Fycm93VXAnLCAnQXJyb3dSaWdodCcsICdBcnJvd0Rvd24nLFxyXG4gICAgICAnSG9tZScsICdFbmQnLCAnSW5zZXJ0JywgJ0RlbGV0ZScsICdCYWNrc3BhY2UnLCAnVGFiJ1xyXG4gICAgXTtcclxuXHJcbiAgICBpZiAoIWFsbG93ZWRDaGFycy50ZXN0KGV2ZW50LmtleSlcclxuICAgICAgJiYgISgoZXZlbnQuY3RybEtleSB8fCBldmVudC5tZXRhS2V5KSAmJiBhbGxvd2VkQ3RybENoYXJzLnRlc3QoZXZlbnQua2V5KSlcclxuICAgICAgJiYgIShhbGxvd2VkT3RoZXJLZXlzLmluY2x1ZGVzKGV2ZW50LmtleSkpKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==