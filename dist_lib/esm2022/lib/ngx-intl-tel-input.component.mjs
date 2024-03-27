import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostListener, Injector, Input, Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import * as lpn from 'google-libphonenumber';
import { CountryCode } from './data/country-code';
import { CountryDropdownDisplayOptions } from './enums/country-dropdown-display-options.enum';
import { CountryISO } from './enums/country-iso.enum';
import { SearchCountryField } from './enums/search-country-field.enum';
import { TooltipLabel } from './enums/tooltip-label.enum';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import { NgxDropdownService } from './services/ngx-dropdown.service';
import { NgxIntlTelFormService } from './services/ngx-intl-tel-form.service';
import { NgxIntlTelInputErrorMatcher } from './services/ngx-intl-tel-input-error-matcher';
import { NgxIntlTelInputService } from './services/ngx-intl-tel-input.service';
import { NgxIntlTelModelAdapter } from './services/ngx-intl-tel-model-adapter';
import * as i0 from "@angular/core";
import * as i1 from "./services/ngx-intl-tel-input.service";
import * as i2 from "./services/ngx-intl-tel-form.service";
import * as i3 from "./services/ngx-dropdown.service";
import * as i4 from "./services/ngx-intl-tel-model-adapter";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/material/legacy-form-field";
import * as i8 from "@angular/material/legacy-input";
import * as i9 from "@angular/material/legacy-button";
import * as i10 from "@angular/material/divider";
import * as i11 from "./components/ngx-intl-tel-trigger/ngx-intl-tel-trigger.component";
import * as i12 from "./components/ngx-intl-tel-country/ngx-intl-tel-country.component";
import * as i13 from "@angular/material/icon";
let ngxIntlTelInputId = 0;
class NgxIntlTelInputComponent {
    onKeyPress($event) {
        if (/[\da-zA-Zа-яА-ЯіІїЇєЄ]/.test($event.key) && this.ngxDropdownService.getMenuState()) {
            this.searchBuffer = `${this.searchBuffer}${$event.key}`;
            const countries = this.ngxIntlTelInputService.searchCountry(this.searchBuffer, [SearchCountryField.All]);
            if (countries.length === 0) {
                this.searchBuffer = '';
            }
            else {
                this.ngxDropdownService.scrollToCountry(countries[0]);
            }
        }
    }
    set dropdownClass(panelClass) {
        const classes = (typeof panelClass === 'string') ? [panelClass] : panelClass;
        this._dropdownPanelClass.push(...classes);
    }
    set dropdownParams(params) {
        if (params && params.length !== 0) {
            this.dropdownParamsData = params;
        }
    }
    set clearable(icon) {
        if (typeof icon === 'boolean') {
            return;
        }
        if (!icon) {
            this.clearIcon = 'close';
            return;
        }
        this.clearIcon = icon;
    }
    get dropdownClass() {
        return [
            ...this._dropdownPanelClass,
            ...(this.stroked ? ['ngx-intl-tel__dropdown-stroked'] : ['ngx-intl-tel__dropdown'])
        ].join(' ');
    }
    get errorStateMatcher() {
        return new NgxIntlTelInputErrorMatcher(this.control);
    }
    get errorKey() {
        const keys = this.control.errors && Object.keys(this.control.errors);
        return keys && keys.length !== 0 ? keys[0] : '';
    }
    get hasError() {
        if (!this.control) {
            return false;
        }
        return this.control.hasError(this.errorKey);
    }
    get invalid() {
        return this.control && this.control.invalid;
    }
    get dirtyAndTouched() {
        return this.control.dirty && this.control.touched;
    }
    constructor(ngxIntlTelInputService, ngxIntlTelForm, ngxDropdownService, ngxIntlTelModelAdapter, viewContainerRef, changeDetector, injector) {
        this.ngxIntlTelInputService = ngxIntlTelInputService;
        this.ngxIntlTelForm = ngxIntlTelForm;
        this.ngxDropdownService = ngxDropdownService;
        this.ngxIntlTelModelAdapter = ngxIntlTelModelAdapter;
        this.viewContainerRef = viewContainerRef;
        this.changeDetector = changeDetector;
        this.injector = injector;
        this.value = '';
        this.small = false;
        this.preferredCountries = [];
        this.enablePlaceholder = true;
        this.cssClass = 'form-control';
        this.onlyCountries = [];
        this.id = `ngx-intl-tel-input-id-${ngxIntlTelInputId++}`;
        this.enableAutoCountrySelect = true;
        this.maxLength = '';
        this.selectFirstCountry = true;
        this.phoneValidation = true;
        this.floatLabel = 'always';
        this.inputLabel = 'Phone number';
        this.separateDialCode = false;
        this.replaceDialCode = true;
        this.isFocused = false;
        this.applyCodeOnFocus = true;
        this.disableCountrySelect = false;
        this.countryChange = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.menuClosed = new EventEmitter();
        this.menuOpened = new EventEmitter();
        this.clear = new EventEmitter();
        this._dropdownPanelClass = [];
        this.selectedCountry = {
            areaCodes: undefined,
            dialCode: '',
            flagClass: '',
            iso2: '',
            name: '',
            placeHolder: '',
            priority: 0
        };
        this.searchBuffer = '';
        this.phoneNumber = '';
        this.preferredCountriesInDropDown = [];
        // Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
        this.phoneUtil = lpn.PhoneNumberUtil.getInstance();
        this.disabled = false;
        this.clearIcon = null;
        this.dropdownParamsData = [
            CountryDropdownDisplayOptions.Dial,
            CountryDropdownDisplayOptions.Flag,
            CountryDropdownDisplayOptions.Name
        ];
        this.onTouched = () => { };
        this.propagateChange = (model) => { };
    }
    ngOnInit() {
        this._init();
        this.ngxDropdownService.onMenuClose.subscribe(() => this.isMenuClose());
    }
    ngOnChanges(changes) {
        if (this.ngxIntlTelInputService.allCountries && changes['selectedCountryISO']
            && changes['selectedCountryISO'].currentValue !== changes['selectedCountryISO'].previousValue) {
            this.getSelectedCountry();
        }
        if (changes.preferredCountries) {
            this.preferredCountriesInDropDown = this.ngxIntlTelInputService.getPreferredCountries(this.preferredCountries);
        }
        this.checkSeparateDialCodeStyle();
    }
    ngAfterViewInit() {
        const ngControl = this.injector.get(NgControl, null);
        if (ngControl) {
            setTimeout(() => {
                this.control = ngControl.control;
            });
        }
    }
    registerOnChange(fn) {
        this.propagateChange = (model) => {
            fn(this.ngxIntlTelModelAdapter.libPhoneNumberModelToControlValue(model));
        };
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        this.phoneNumber = this.ngxIntlTelModelAdapter.controlValueToString(obj);
    }
    _init() {
        this.ngxIntlTelInputService.fetchCountryData(this.enablePlaceholder);
        if (this.preferredCountries.length) {
            this.preferredCountriesInDropDown = this.ngxIntlTelInputService.getPreferredCountries(this.preferredCountries);
        }
        if (this.onlyCountries.length) {
            this.ngxIntlTelInputService.setCountries(this.onlyCountries);
        }
        if (this.selectFirstCountry) {
            if (this.preferredCountriesInDropDown.length) {
                this.setSelectedCountry(this.preferredCountriesInDropDown[0]);
            }
            else {
                this.setSelectedCountry(this.ngxIntlTelInputService.allCountries[0]);
            }
        }
        this.getSelectedCountry();
        this.checkSeparateDialCodeStyle();
        this.onCountrySelect(this.selectedCountry);
    }
    setSelectedCountry(country) {
        this.selectedCountry = country;
        this.countryChange.emit(country);
    }
    getSelectedCountry() {
        if (this.selectedCountryISO) {
            const country = this.ngxIntlTelInputService.allCountries.find(c => {
                return (c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase());
            });
            this.setSelectedCountry(country);
            if (this.selectedCountry) {
                if (this.phoneNumber) {
                    this.onPhoneNumberChange();
                }
                else {
                    this.propagateChange(null);
                }
            }
        }
    }
    onPhoneNumberChange() {
        this.value = this.phoneNumber;
        let number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
        }
        catch (e) {
        }
        let countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (and areaCode if needed) (e.g. select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.getCountryCode()
                ? this.ngxIntlTelInputService.getCountryIsoCode(number.getCountryCode(), number)
                : this.selectedCountry.iso2;
            if (countryCode && countryCode !== this.selectedCountry.iso2) {
                const newCountry = this.ngxIntlTelInputService.allCountries.find(c => c.iso2 === countryCode);
                if (newCountry) {
                    this.setSelectedCountry(newCountry);
                }
            }
        }
        countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
        this.checkSeparateDialCodeStyle();
        if (!this.value) {
            this.propagateChange(null);
        }
        else {
            const intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.phoneNumber = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
                countryCode: countryCode.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode,
                id: this.id
            });
        }
    }
    onCountrySelect(country, el) {
        this.ngxDropdownService.close();
        this.setSelectedCountry(country);
        this.checkSeparateDialCodeStyle();
        this.value = this.phoneNumber;
        let number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
        }
        catch (e) {
        }
        if (this.replaceDialCode) {
            this.phoneNumber = this._replaceDialCode(number, country.dialCode);
        }
        const intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : ``;
        // parse phoneNumber if separate dial code is needed
        if (this.separateDialCode && intlNo) {
            this.phoneNumber = this.removeDialCode(intlNo);
        }
        this.propagateChange({
            number: this.value,
            internationalNumber: intlNo,
            nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
            countryCode: this.selectedCountry.iso2.toUpperCase(),
            dialCode: '+' + this.selectedCountry.dialCode,
            id: this.id
        });
        if (el) {
            el.focus();
        }
    }
    removeDialCode(phoneNumber) {
        if (this.separateDialCode && phoneNumber) {
            phoneNumber = phoneNumber.substring(phoneNumber.indexOf(' ') + 1);
        }
        return phoneNumber;
    }
    _replaceDialCode(phoneNumber, newCode) {
        const dialCode = Number(newCode);
        if (!phoneNumber) {
            return `+${newCode}`;
        }
        phoneNumber.setCountryCode(dialCode);
        return this.phoneUtil.format(phoneNumber, lpn.PhoneNumberFormat.E164);
    }
    // adjust input alignment
    checkSeparateDialCodeStyle() {
        if (this.separateDialCode && this.selectedCountry) {
            const countryCode = this.selectedCountry.dialCode;
            this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (countryCode.length + 1);
        }
        else {
            this.separateDialCodeClass = '';
        }
    }
    _applyDialCode() {
        if (!this.phoneNumber) {
            this.phoneNumber = `+${this.selectedCountry.dialCode}`;
            this.onPhoneNumberChange();
        }
    }
    onBlurEvent() {
        this.onTouched();
        this.onBlur.emit();
        this.isFocused = !this.isFocused;
    }
    onFocusEvent() {
        this.onFocus.emit();
        this.isFocused = !this.isFocused;
        if (this.applyCodeOnFocus) {
            this._applyDialCode();
        }
    }
    isMenuOpen() {
        this.menuOpened.emit();
        this.searchBuffer = '';
        if (this.selectedCountry) {
            this.ngxDropdownService.scrollToCountry(this.selectedCountry);
        }
    }
    isMenuClose() {
        this.menuClosed.emit();
    }
    openDropdown() {
        this.ngxDropdownService.openFromTemplate(this.dropdownTemplate, this.connectedElement, this.viewContainerRef);
        this.isMenuOpen();
    }
    onClearClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.phoneNumber = '';
        this.propagateChange(null);
        this.clear.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelInputComponent, deps: [{ token: i1.NgxIntlTelInputService }, { token: i2.NgxIntlTelFormService }, { token: i3.NgxDropdownService }, { token: i4.NgxIntlTelModelAdapter }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.3", type: NgxIntlTelInputComponent, selector: "ngx-intl-tel-input", inputs: { value: "value", small: "small", preferredCountries: "preferredCountries", enablePlaceholder: "enablePlaceholder", cssClass: "cssClass", onlyCountries: "onlyCountries", id: "id", enableAutoCountrySelect: "enableAutoCountrySelect", maxLength: "maxLength", tooltipField: "tooltipField", selectFirstCountry: "selectFirstCountry", selectedCountryISO: "selectedCountryISO", phoneValidation: "phoneValidation", floatLabel: "floatLabel", inputLabel: "inputLabel", separateDialCode: "separateDialCode", replaceDialCode: "replaceDialCode", stroked: "stroked", isFocused: "isFocused", applyCodeOnFocus: "applyCodeOnFocus", disableCountrySelect: "disableCountrySelect", dropdownClass: "dropdownClass", dropdownParams: "dropdownParams", errors: "errors", clearable: "clearable" }, outputs: { countryChange: "countryChange", onBlur: "onBlur", onFocus: "onFocus", menuClosed: "menuClosed", menuOpened: "menuOpened", clear: "clear" }, host: { listeners: { "window:keypress": "onKeyPress($event)" } }, providers: [
            CountryCode,
            NgxIntlTelInputService,
            {
                provide: NG_VALUE_ACCESSOR,
                // tslint:disable-next-line:no-forward-ref
                useExisting: forwardRef(() => NgxIntlTelInputComponent),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useFactory: (ngxIntlTelInputComponent, ngxIntlTelModelAdapter) => {
                    return phoneNumberValidator(ngxIntlTelInputComponent, ngxIntlTelModelAdapter);
                },
                deps: [NgxIntlTelInputComponent, NgxIntlTelModelAdapter],
                multi: true,
            }
        ], viewQueries: [{ propertyName: "dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true, static: true }, { propertyName: "connectedElement", first: true, predicate: ["connectedElement"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"ngx-intl-tel\"\r\n     [class.ngx-intl-tel_stroked]=\"stroked\"\r\n     [class.ngx-intl-tel_error]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n     [class.ngx-intl-tel_opened]=\"ngxDropdownService.menuState$ | async\"\r\n     [class.ngx-intl-tel_focus]=\"isFocused\">\r\n    <ngx-intl-tel-trigger *ngIf=\"!disableCountrySelect\"\r\n                          class=\"ngx-intl-tel__trigger\"\r\n                          [class.ngx-intl-tel__trigger_small]=\"small\"\r\n                          #connectedElement\r\n                          [country]=\"selectedCountry\"\r\n                          [isError]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n                          [isMenuOpened]=\"ngxDropdownService.menuState$ | async\"\r\n                          [tooltipField]=\"tooltipField\"\r\n                          [stroked]=\"stroked\"\r\n                          (click)=\"openDropdown()\">\r\n    </ngx-intl-tel-trigger>\r\n    <mat-form-field [floatLabel]=\"floatLabel\"\r\n                    class=\"ngx-intl-tel__form-field\"\r\n                    [class.ngx-intl-tel__form-field_small]=\"small\">\r\n        <mat-label class=\"ngx-intl-tel__label\">\r\n            {{ inputLabel }}\r\n        </mat-label>\r\n        <input class=\"ngx-intl-tel__input\"\r\n               #focusable\r\n               matInput\r\n               type=\"tel\"\r\n               autocomplete=\"off\"\r\n               [id]=\"id\"\r\n               [ngClass]=\"cssClass\"\r\n               [disabled]=\"disabled\"\r\n               [placeholder]=\"removeDialCode(selectedCountry?.placeHolder || '')\"\r\n               [attr.maxLength]=\"maxLength\"\r\n               [attr.validation]=\"phoneValidation\"\r\n               [errorStateMatcher]=\"errorStateMatcher\"\r\n               [(ngModel)]=\"phoneNumber\"\r\n               (ngModelChange)=\"onPhoneNumberChange()\"\r\n               (blur)=\"onBlurEvent()\"\r\n               (focus)=\"onFocusEvent()\"\r\n               (keydown)=\"ngxIntlTelInputService.onInputKeyPress($event)\">\r\n        <button *ngIf=\"clearIcon\"\r\n                mat-icon-button\r\n                matSuffix\r\n                (click)=\"onClearClick($event)\">\r\n            <mat-icon>{{ clearIcon }}</mat-icon>\r\n        </button>\r\n        <mat-error *ngIf=\"matErrorContainer.children.length === 0 && hasError\">\r\n            {{ (errors && errors[errorKey]) || control.getError(errorKey) }}\r\n        </mat-error>\r\n        <div #matErrorContainer>\r\n            <ng-content select=\"mat-error\"></ng-content>\r\n        </div>\r\n    </mat-form-field>\r\n    <ng-template #dropdownTemplate>\r\n        <div [class]=\"dropdownClass\">\r\n            <ngx-intl-tel-country [countries]=\"preferredCountriesInDropDown\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n            <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\r\n            <ngx-intl-tel-country [countries]=\"ngxIntlTelInputService.allCountries\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n        </div>\r\n    </ng-template>\r\n</div>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel{display:flex;width:100%;border-radius:0 8px 8px 0}.ngx-intl-tel__input:focus{box-shadow:none!important}.ngx-intl-tel_stroked .mat-form-field.mat-form-field-should-float .mat-form-field-label{transform:translateY(-1.05em) scale(.75)!important}.ngx-intl-tel_stroked .ngx-intl-tel__trigger{height:56px;transition:.3s ease-in-out;z-index:2}.ngx-intl-tel_stroked .ngx-intl-tel__trigger_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__label{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:16px;color:var(--ngx-intl-tel-color-label)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-text);height:56px;width:100%;border:1px solid var(--ngx-intl-tel-color-border);transform:translate(-1px);border-radius:0 8px 8px 0;padding-left:13px;transition:.3s ease-in-out;z-index:1;box-sizing:border-box}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{padding:.4375em 0!important;border-top:.84375em solid transparent!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field:hover{border:1px solid var(--ngx-intl-tel-color-border-hover);z-index:10;cursor:pointer}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper{padding-bottom:0}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{padding:.6375em 0;border-top:.9375em solid transparent}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-underline{display:none}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element{caret-color:var(--ngx-intl-tel-color-text);line-height:20px;color:var(--ngx-intl-tel-color-text)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element::placeholder{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-placeholder)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .form-control:focus{border-color:unset!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-subscript-wrapper{margin-top:var(--mat-subscript-wrapper-margin-top)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-error{font-family:Source Sans Pro,sans-serif;font-size:10px;font-weight:400;line-height:13px;color:var(--ngx-intl-tel-error-color);margin-top:var(--mat-error-margin-top)!important}.ngx-intl-tel_stroked.ngx-intl-tel_opened,.ngx-intl-tel_stroked.ngx-intl-tel_focus{box-shadow:0 5px 24px #39415c26}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__label{color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field{border-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element{caret-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element::placeholder{color:var(--ngx-intl-tel-error-color);opacity:.7}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field:hover{border-color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel__dropdown{max-height:288px!important;overflow-y:auto}.ngx-intl-tel__dropdown-stroked{height:176px;width:96px;border:solid 1px var(--ngx-intl-tel-color-border-hover);border-radius:0 0 8px 8px!important;overflow:auto}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i7.MatLegacyError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i7.MatLegacyFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i7.MatLegacyLabel, selector: "mat-label" }, { kind: "directive", type: i7.MatLegacySuffix, selector: "[matSuffix]" }, { kind: "directive", type: i8.MatLegacyInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", exportAs: ["matInput"] }, { kind: "component", type: i9.MatLegacyButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i10.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: i11.NgxIntlTelTriggerComponent, selector: "ngx-intl-tel-trigger", inputs: ["country", "showCode", "stroked", "tooltipField", "isMenuOpened", "isError"] }, { kind: "component", type: i12.NgxIntlTelCountryComponent, selector: "ngx-intl-tel-country", inputs: ["countries", "dropdownParams", "stroked"], outputs: ["countryClick"] }, { kind: "component", type: i13.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }], encapsulation: i0.ViewEncapsulation.None }); }
}
export { NgxIntlTelInputComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-intl-tel-input', encapsulation: ViewEncapsulation.None, providers: [
                        CountryCode,
                        NgxIntlTelInputService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(() => NgxIntlTelInputComponent),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useFactory: (ngxIntlTelInputComponent, ngxIntlTelModelAdapter) => {
                                return phoneNumberValidator(ngxIntlTelInputComponent, ngxIntlTelModelAdapter);
                            },
                            deps: [NgxIntlTelInputComponent, NgxIntlTelModelAdapter],
                            multi: true,
                        }
                    ], template: "<div class=\"ngx-intl-tel\"\r\n     [class.ngx-intl-tel_stroked]=\"stroked\"\r\n     [class.ngx-intl-tel_error]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n     [class.ngx-intl-tel_opened]=\"ngxDropdownService.menuState$ | async\"\r\n     [class.ngx-intl-tel_focus]=\"isFocused\">\r\n    <ngx-intl-tel-trigger *ngIf=\"!disableCountrySelect\"\r\n                          class=\"ngx-intl-tel__trigger\"\r\n                          [class.ngx-intl-tel__trigger_small]=\"small\"\r\n                          #connectedElement\r\n                          [country]=\"selectedCountry\"\r\n                          [isError]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n                          [isMenuOpened]=\"ngxDropdownService.menuState$ | async\"\r\n                          [tooltipField]=\"tooltipField\"\r\n                          [stroked]=\"stroked\"\r\n                          (click)=\"openDropdown()\">\r\n    </ngx-intl-tel-trigger>\r\n    <mat-form-field [floatLabel]=\"floatLabel\"\r\n                    class=\"ngx-intl-tel__form-field\"\r\n                    [class.ngx-intl-tel__form-field_small]=\"small\">\r\n        <mat-label class=\"ngx-intl-tel__label\">\r\n            {{ inputLabel }}\r\n        </mat-label>\r\n        <input class=\"ngx-intl-tel__input\"\r\n               #focusable\r\n               matInput\r\n               type=\"tel\"\r\n               autocomplete=\"off\"\r\n               [id]=\"id\"\r\n               [ngClass]=\"cssClass\"\r\n               [disabled]=\"disabled\"\r\n               [placeholder]=\"removeDialCode(selectedCountry?.placeHolder || '')\"\r\n               [attr.maxLength]=\"maxLength\"\r\n               [attr.validation]=\"phoneValidation\"\r\n               [errorStateMatcher]=\"errorStateMatcher\"\r\n               [(ngModel)]=\"phoneNumber\"\r\n               (ngModelChange)=\"onPhoneNumberChange()\"\r\n               (blur)=\"onBlurEvent()\"\r\n               (focus)=\"onFocusEvent()\"\r\n               (keydown)=\"ngxIntlTelInputService.onInputKeyPress($event)\">\r\n        <button *ngIf=\"clearIcon\"\r\n                mat-icon-button\r\n                matSuffix\r\n                (click)=\"onClearClick($event)\">\r\n            <mat-icon>{{ clearIcon }}</mat-icon>\r\n        </button>\r\n        <mat-error *ngIf=\"matErrorContainer.children.length === 0 && hasError\">\r\n            {{ (errors && errors[errorKey]) || control.getError(errorKey) }}\r\n        </mat-error>\r\n        <div #matErrorContainer>\r\n            <ng-content select=\"mat-error\"></ng-content>\r\n        </div>\r\n    </mat-form-field>\r\n    <ng-template #dropdownTemplate>\r\n        <div [class]=\"dropdownClass\">\r\n            <ngx-intl-tel-country [countries]=\"preferredCountriesInDropDown\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n            <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\r\n            <ngx-intl-tel-country [countries]=\"ngxIntlTelInputService.allCountries\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n        </div>\r\n    </ng-template>\r\n</div>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel{display:flex;width:100%;border-radius:0 8px 8px 0}.ngx-intl-tel__input:focus{box-shadow:none!important}.ngx-intl-tel_stroked .mat-form-field.mat-form-field-should-float .mat-form-field-label{transform:translateY(-1.05em) scale(.75)!important}.ngx-intl-tel_stroked .ngx-intl-tel__trigger{height:56px;transition:.3s ease-in-out;z-index:2}.ngx-intl-tel_stroked .ngx-intl-tel__trigger_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__label{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:16px;color:var(--ngx-intl-tel-color-label)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-text);height:56px;width:100%;border:1px solid var(--ngx-intl-tel-color-border);transform:translate(-1px);border-radius:0 8px 8px 0;padding-left:13px;transition:.3s ease-in-out;z-index:1;box-sizing:border-box}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{padding:.4375em 0!important;border-top:.84375em solid transparent!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field:hover{border:1px solid var(--ngx-intl-tel-color-border-hover);z-index:10;cursor:pointer}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper{padding-bottom:0}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{padding:.6375em 0;border-top:.9375em solid transparent}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-underline{display:none}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element{caret-color:var(--ngx-intl-tel-color-text);line-height:20px;color:var(--ngx-intl-tel-color-text)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element::placeholder{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-placeholder)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .form-control:focus{border-color:unset!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-subscript-wrapper{margin-top:var(--mat-subscript-wrapper-margin-top)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-error{font-family:Source Sans Pro,sans-serif;font-size:10px;font-weight:400;line-height:13px;color:var(--ngx-intl-tel-error-color);margin-top:var(--mat-error-margin-top)!important}.ngx-intl-tel_stroked.ngx-intl-tel_opened,.ngx-intl-tel_stroked.ngx-intl-tel_focus{box-shadow:0 5px 24px #39415c26}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__label{color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field{border-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element{caret-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-input-element::placeholder{color:var(--ngx-intl-tel-error-color);opacity:.7}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field:hover{border-color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel__dropdown{max-height:288px!important;overflow-y:auto}.ngx-intl-tel__dropdown-stroked{height:176px;width:96px;border:solid 1px var(--ngx-intl-tel-color-border-hover);border-radius:0 0 8px 8px!important;overflow:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgxIntlTelInputService }, { type: i2.NgxIntlTelFormService }, { type: i3.NgxDropdownService }, { type: i4.NgxIntlTelModelAdapter }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i0.Injector }]; }, propDecorators: { onKeyPress: [{
                type: HostListener,
                args: ['window:keypress', ['$event']]
            }], dropdownTemplate: [{
                type: ViewChild,
                args: ['dropdownTemplate', { static: true }]
            }], connectedElement: [{
                type: ViewChild,
                args: ['connectedElement', { static: false, read: ElementRef }]
            }], value: [{
                type: Input
            }], small: [{
                type: Input
            }], preferredCountries: [{
                type: Input
            }], enablePlaceholder: [{
                type: Input
            }], cssClass: [{
                type: Input
            }], onlyCountries: [{
                type: Input
            }], id: [{
                type: Input
            }], enableAutoCountrySelect: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], tooltipField: [{
                type: Input
            }], selectFirstCountry: [{
                type: Input
            }], selectedCountryISO: [{
                type: Input
            }], phoneValidation: [{
                type: Input
            }], floatLabel: [{
                type: Input
            }], inputLabel: [{
                type: Input
            }], separateDialCode: [{
                type: Input
            }], replaceDialCode: [{
                type: Input
            }], stroked: [{
                type: Input
            }], isFocused: [{
                type: Input
            }], applyCodeOnFocus: [{
                type: Input
            }], disableCountrySelect: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], dropdownParams: [{
                type: Input
            }], errors: [{
                type: Input
            }], clearable: [{
                type: Input
            }], countryChange: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], menuClosed: [{
                type: Output
            }], menuOpened: [{
                type: Output
            }], clear: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW50bC10ZWwtaW5wdXQvc3JjL2xpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBR0wsTUFBTSxFQUVOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoSCxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSTFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FB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ZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0b3IsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IExlZ2FjeUZsb2F0TGFiZWxUeXBlIGFzIEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWZvcm0tZmllbGQnO1xyXG5pbXBvcnQgKiBhcyBscG4gZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcclxuaW1wb3J0IHsgQ291bnRyeUNvZGUgfSBmcm9tICcuL2RhdGEvY291bnRyeS1jb2RlJztcclxuaW1wb3J0IHsgQ291bnRyeURyb3Bkb3duRGlzcGxheU9wdGlvbnMgfSBmcm9tICcuL2VudW1zL2NvdW50cnktZHJvcGRvd24tZGlzcGxheS1vcHRpb25zLmVudW0nO1xyXG5pbXBvcnQgeyBDb3VudHJ5SVNPIH0gZnJvbSAnLi9lbnVtcy9jb3VudHJ5LWlzby5lbnVtJztcclxuaW1wb3J0IHsgU2VhcmNoQ291bnRyeUZpZWxkIH0gZnJvbSAnLi9lbnVtcy9zZWFyY2gtY291bnRyeS1maWVsZC5lbnVtJztcclxuaW1wb3J0IHsgVG9vbHRpcExhYmVsIH0gZnJvbSAnLi9lbnVtcy90b29sdGlwLWxhYmVsLmVudW0nO1xyXG5pbXBvcnQgeyBJTmd4SW50bFRlbElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL25neC1pbnRsLXRlbC1pbnB1dC1jb21wb25lbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ291bnRyeSB9IGZyb20gJy4vbW9kZWwvY291bnRyeS5tb2RlbCc7XHJcbmltcG9ydCB7IEludGxUZWxNb2RlbCB9IGZyb20gJy4vbW9kZWwvaW50bC10ZWwubW9kZWwnO1xyXG5pbXBvcnQgeyBwaG9uZU51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vbmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IE5neERyb3Bkb3duU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmd4LWRyb3Bkb3duLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hJbnRsVGVsRm9ybVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1pbnRsLXRlbC1mb3JtLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hJbnRsVGVsSW5wdXRFcnJvck1hdGNoZXIgfSBmcm9tICcuL3NlcnZpY2VzL25neC1pbnRsLXRlbC1pbnB1dC1lcnJvci1tYXRjaGVyJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbElucHV0U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmd4LWludGwtdGVsLWlucHV0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ3hJbnRsVGVsTW9kZWxBZGFwdGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtbW9kZWwtYWRhcHRlcic7XHJcblxyXG5sZXQgbmd4SW50bFRlbElucHV0SWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaW50bC10ZWwtaW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDb3VudHJ5Q29kZSxcclxuICAgIE5neEludGxUZWxJbnB1dFNlcnZpY2UsXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4SW50bFRlbElucHV0Q29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUZhY3Rvcnk6IChuZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQ6IElOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQsXHJcbiAgICAgICAgICAgICAgICAgICBuZ3hJbnRsVGVsTW9kZWxBZGFwdGVyOiBOZ3hJbnRsVGVsTW9kZWxBZGFwdGVyPHVua25vd24+KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBob25lTnVtYmVyVmFsaWRhdG9yKG5neEludGxUZWxJbnB1dENvbXBvbmVudCwgbmd4SW50bFRlbE1vZGVsQWRhcHRlcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRlcHM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQsIE5neEludGxUZWxNb2RlbEFkYXB0ZXJdLFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIElOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQge1xyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5cHJlc3MnLCBbJyRldmVudCddKVxyXG4gIG9uS2V5UHJlc3MoJGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoL1tcXGRhLXpBLVrQsC3Rj9CQLdCv0ZbQhtGX0IfRlNCEXS8udGVzdCgkZXZlbnQua2V5KSAmJiB0aGlzLm5neERyb3Bkb3duU2VydmljZS5nZXRNZW51U3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNlYXJjaEJ1ZmZlciA9IGAke3RoaXMuc2VhcmNoQnVmZmVyfSR7JGV2ZW50LmtleX1gO1xyXG4gICAgICBjb25zdCBjb3VudHJpZXMgPSB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2Uuc2VhcmNoQ291bnRyeSh0aGlzLnNlYXJjaEJ1ZmZlciwgW1NlYXJjaENvdW50cnlGaWVsZC5BbGxdKTtcclxuICAgICAgaWYgKGNvdW50cmllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLnNlYXJjaEJ1ZmZlciA9ICcnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmd4RHJvcGRvd25TZXJ2aWNlLnNjcm9sbFRvQ291bnRyeShjb3VudHJpZXNbMF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAVmlld0NoaWxkKCdkcm9wZG93blRlbXBsYXRlJywge3N0YXRpYzogdHJ1ZX0pXHJcbiAgZHJvcGRvd25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8SFRNTERpdkVsZW1lbnQ+O1xyXG5cclxuICBAVmlld0NoaWxkKCdjb25uZWN0ZWRFbGVtZW50Jywge3N0YXRpYzogZmFsc2UsIHJlYWQ6IEVsZW1lbnRSZWZ9KVxyXG4gIGNvbm5lY3RlZEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgQElucHV0KClcclxuICBzbWFsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHByZWZlcnJlZENvdW50cmllczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBlbmFibGVQbGFjZWhvbGRlcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY3NzQ2xhc3M6IHN0cmluZyA9ICdmb3JtLWNvbnRyb2wnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG9ubHlDb3VudHJpZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgaWQ6IHN0cmluZyA9IGBuZ3gtaW50bC10ZWwtaW5wdXQtaWQtJHtuZ3hJbnRsVGVsSW5wdXRJZCsrfWA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZW5hYmxlQXV0b0NvdW50cnlTZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG1heExlbmd0aDogbnVtYmVyIHwgc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdG9vbHRpcEZpZWxkOiBUb29sdGlwTGFiZWw7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2VsZWN0Rmlyc3RDb3VudHJ5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZWxlY3RlZENvdW50cnlJU086IENvdW50cnlJU087XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcGhvbmVWYWxpZGF0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICdhbHdheXMnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGlucHV0TGFiZWw6IHN0cmluZyA9ICdQaG9uZSBudW1iZXInO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNlcGFyYXRlRGlhbENvZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICByZXBsYWNlRGlhbENvZGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHN0cm9rZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgaXNGb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgYXBwbHlDb2RlT25Gb2N1czogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZUNvdW50cnlTZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZHJvcGRvd25DbGFzcyhwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgY29uc3QgY2xhc3NlcyA9ICh0eXBlb2YgcGFuZWxDbGFzcyA9PT0gJ3N0cmluZycpID8gW3BhbmVsQ2xhc3NdIDogcGFuZWxDbGFzcztcclxuICAgIHRoaXMuX2Ryb3Bkb3duUGFuZWxDbGFzcy5wdXNoKC4uLmNsYXNzZXMpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZHJvcGRvd25QYXJhbXMocGFyYW1zOiBDb3VudHJ5RHJvcGRvd25EaXNwbGF5T3B0aW9uc1tdKSB7XHJcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5kcm9wZG93blBhcmFtc0RhdGEgPSBwYXJhbXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGVycm9yczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY2xlYXJhYmxlKGljb246IHN0cmluZykge1xyXG4gICAgaWYgKHR5cGVvZiBpY29uID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpY29uKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJJY29uID0gJ2Nsb3NlJztcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGVhckljb24gPSBpY29uO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgY291bnRyeUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q291bnRyeT4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25CbHVyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvbkZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBtZW51Q2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBtZW51T3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgZ2V0IGRyb3Bkb3duQ2xhc3MoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgLi4udGhpcy5fZHJvcGRvd25QYW5lbENsYXNzLFxyXG4gICAgICAuLi4odGhpcy5zdHJva2VkID8gWyduZ3gtaW50bC10ZWxfX2Ryb3Bkb3duLXN0cm9rZWQnXSA6IFsnbmd4LWludGwtdGVsX19kcm9wZG93biddKVxyXG4gICAgXS5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXJyb3JTdGF0ZU1hdGNoZXIoKTogRXJyb3JTdGF0ZU1hdGNoZXIge1xyXG4gICAgcmV0dXJuIG5ldyBOZ3hJbnRsVGVsSW5wdXRFcnJvck1hdGNoZXIodGhpcy5jb250cm9sKTtcclxuICB9XHJcblxyXG4gIGdldCBlcnJvcktleSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qga2V5cyA9IHRoaXMuY29udHJvbC5lcnJvcnMgJiYgT2JqZWN0LmtleXModGhpcy5jb250cm9sLmVycm9ycyk7XHJcbiAgICByZXR1cm4ga2V5cyAmJiBrZXlzLmxlbmd0aCAhPT0gMCA/IGtleXNbMF0gOiAnJztcclxuICB9XHJcblxyXG4gIGdldCBoYXNFcnJvcigpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5jb250cm9sKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNvbnRyb2wuaGFzRXJyb3IodGhpcy5lcnJvcktleSk7XHJcbiAgfVxyXG5cclxuICBnZXQgaW52YWxpZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRyb2wgJiYgdGhpcy5jb250cm9sLmludmFsaWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgZGlydHlBbmRUb3VjaGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udHJvbC5kaXJ0eSAmJiB0aGlzLmNvbnRyb2wudG91Y2hlZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Ryb3Bkb3duUGFuZWxDbGFzczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgc2VsZWN0ZWRDb3VudHJ5OiBDb3VudHJ5ID0ge1xyXG4gICAgYXJlYUNvZGVzOiB1bmRlZmluZWQsXHJcbiAgICBkaWFsQ29kZTogJycsXHJcbiAgICBmbGFnQ2xhc3M6ICcnLFxyXG4gICAgaXNvMjogJycsXHJcbiAgICBuYW1lOiAnJyxcclxuICAgIHBsYWNlSG9sZGVyOiAnJyxcclxuICAgIHByaW9yaXR5OiAwXHJcbiAgfTtcclxuXHJcbiAgc2VhcmNoQnVmZmVyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgc2VwYXJhdGVEaWFsQ29kZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gIHBob25lTnVtYmVyID0gJyc7XHJcblxyXG4gIHByZWZlcnJlZENvdW50cmllc0luRHJvcERvd246IEFycmF5PENvdW50cnk+ID0gW107XHJcbiAgLy8gSGFzIHRvIGJlICdhbnknIHRvIHByZXZlbnQgYSBuZWVkIHRvIGluc3RhbGwgQHR5cGVzL2dvb2dsZS1saWJwaG9uZW51bWJlciBieSB0aGUgcGFja2FnZSB1c2VyLi4uXHJcbiAgcGhvbmVVdGlsOiBhbnkgPSBscG4uUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCk7XHJcblxyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIGNsZWFySWNvbjogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgZHJvcGRvd25QYXJhbXNEYXRhOiBDb3VudHJ5RHJvcGRvd25EaXNwbGF5T3B0aW9uc1tdID0gW1xyXG4gICAgQ291bnRyeURyb3Bkb3duRGlzcGxheU9wdGlvbnMuRGlhbCxcclxuICAgIENvdW50cnlEcm9wZG93bkRpc3BsYXlPcHRpb25zLkZsYWcsXHJcbiAgICBDb3VudHJ5RHJvcGRvd25EaXNwbGF5T3B0aW9ucy5OYW1lXHJcbiAgXTtcclxuXHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcblxyXG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChtb2RlbDogSW50bFRlbE1vZGVsIHwgbnVsbCkgPT4ge307XHJcblxyXG4gIGNvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbmd4SW50bFRlbElucHV0U2VydmljZTogTmd4SW50bFRlbElucHV0U2VydmljZSxcclxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbmd4SW50bFRlbEZvcm06IE5neEludGxUZWxGb3JtU2VydmljZSxcclxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbmd4RHJvcGRvd25TZXJ2aWNlOiBOZ3hEcm9wZG93blNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ3hJbnRsVGVsTW9kZWxBZGFwdGVyOiBOZ3hJbnRsVGVsTW9kZWxBZGFwdGVyPHVua25vd24+LFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB0aGlzLm5neERyb3Bkb3duU2VydmljZS5vbk1lbnVDbG9zZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pc01lbnVDbG9zZSgpKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICh0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuYWxsQ291bnRyaWVzICYmIGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddXHJcbiAgICAgICYmIGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ10ucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICB0aGlzLmdldFNlbGVjdGVkQ291bnRyeSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXMucHJlZmVycmVkQ291bnRyaWVzKSB7XHJcbiAgICAgIHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93biA9IHRoaXMubmd4SW50bFRlbElucHV0U2VydmljZS5nZXRQcmVmZXJyZWRDb3VudHJpZXModGhpcy5wcmVmZXJyZWRDb3VudHJpZXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgbmdDb250cm9sOiBOZ0NvbnRyb2wgPSB0aGlzLmluamVjdG9yLmdldChOZ0NvbnRyb2wsIG51bGwpO1xyXG4gICAgaWYgKG5nQ29udHJvbCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNvbnRyb2wgPSBuZ0NvbnRyb2wuY29udHJvbCBhcyBGb3JtQ29udHJvbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gKG1vZGVsKSA9PiB7XHJcbiAgICAgIGZuKHRoaXMubmd4SW50bFRlbE1vZGVsQWRhcHRlci5saWJQaG9uZU51bWJlck1vZGVsVG9Db250cm9sVmFsdWUobW9kZWwpKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucGhvbmVOdW1iZXIgPSB0aGlzLm5neEludGxUZWxNb2RlbEFkYXB0ZXIuY29udHJvbFZhbHVlVG9TdHJpbmcob2JqKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuZmV0Y2hDb3VudHJ5RGF0YSh0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKTtcclxuICAgIGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duID0gdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmdldFByZWZlcnJlZENvdW50cmllcyh0aGlzLnByZWZlcnJlZENvdW50cmllcyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2Uuc2V0Q291bnRyaWVzKHRoaXMub25seUNvdW50cmllcyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zZWxlY3RGaXJzdENvdW50cnkpIHtcclxuICAgICAgaWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkQ291bnRyeSh0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25bMF0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KHRoaXMubmd4SW50bFRlbElucHV0U2VydmljZS5hbGxDb3VudHJpZXNbMF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmdldFNlbGVjdGVkQ291bnRyeSgpO1xyXG4gICAgdGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG4gICAgdGhpcy5vbkNvdW50cnlTZWxlY3QodGhpcy5zZWxlY3RlZENvdW50cnkpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWRDb3VudHJ5KGNvdW50cnk6IENvdW50cnkpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gY291bnRyeTtcclxuICAgIHRoaXMuY291bnRyeUNoYW5nZS5lbWl0KGNvdW50cnkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZWN0ZWRDb3VudHJ5KCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5SVNPKSB7XHJcbiAgICAgIGNvbnN0IGNvdW50cnkgPSB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChjLmlzbzIudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5zZWxlY3RlZENvdW50cnlJU08udG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KTtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGhvbmVOdW1iZXIpIHtcclxuICAgICAgICAgIHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUGhvbmVOdW1iZXJDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcclxuXHJcbiAgICBsZXQgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXI7XHJcbiAgICB0cnkge1xyXG4gICAgICBudW1iZXIgPSB0aGlzLnBob25lVXRpbC5wYXJzZSh0aGlzLnBob25lTnVtYmVyLCB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb3VudHJ5Q29kZSA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XHJcbiAgICAvLyBhdXRvIHNlbGVjdCBjb3VudHJ5IGJhc2VkIG9uIHRoZSBleHRlbnNpb24gKGFuZCBhcmVhQ29kZSBpZiBuZWVkZWQpIChlLmcuIHNlbGVjdCBDYW5hZGEgaWYgbnVtYmVyIHN0YXJ0cyB3aXRoICsxIDQxNilcclxuICAgIGlmICh0aGlzLmVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0KSB7XHJcbiAgICAgIGNvdW50cnlDb2RlID0gbnVtYmVyICYmIG51bWJlci5nZXRDb3VudHJ5Q29kZSgpXHJcbiAgICAgICAgPyB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuZ2V0Q291bnRyeUlzb0NvZGUobnVtYmVyLmdldENvdW50cnlDb2RlKCksIG51bWJlcilcclxuICAgICAgICA6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XHJcbiAgICAgIGlmIChjb3VudHJ5Q29kZSAmJiBjb3VudHJ5Q29kZSAhPT0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMikge1xyXG4gICAgICAgIGNvbnN0IG5ld0NvdW50cnkgPSB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiBjLmlzbzIgPT09IGNvdW50cnlDb2RlKTtcclxuICAgICAgICBpZiAobmV3Q291bnRyeSkge1xyXG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkobmV3Q291bnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlID8gY291bnRyeUNvZGUgOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xyXG5cclxuICAgIHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMudmFsdWUpIHtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbnRsTm8gPSBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCkgOiAnJztcclxuXHJcbiAgICAgIC8vIHBhcnNlIHBob25lTnVtYmVyIGlmIHNlcGFyYXRlIGRpYWwgY29kZSBpcyBuZWVkZWRcclxuICAgICAgaWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBpbnRsTm8pIHtcclxuICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XHJcbiAgICAgICAgbnVtYmVyOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgIGludGVybmF0aW9uYWxOdW1iZXI6IGludGxObyxcclxuICAgICAgICBuYXRpb25hbE51bWJlcjogbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0Lk5BVElPTkFMKSA6ICcnLFxyXG4gICAgICAgIGNvdW50cnlDb2RlOiBjb3VudHJ5Q29kZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgIGRpYWxDb2RlOiAnKycgKyB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZSxcclxuICAgICAgICBpZDogdGhpcy5pZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ291bnRyeVNlbGVjdChjb3VudHJ5OiBDb3VudHJ5LCBlbD86IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIHRoaXMubmd4RHJvcGRvd25TZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICB0aGlzLnNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KTtcclxuICAgIHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuICAgIHRoaXMudmFsdWUgPSB0aGlzLnBob25lTnVtYmVyO1xyXG5cclxuICAgIGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIG51bWJlciA9IHRoaXMucGhvbmVVdGlsLnBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmVwbGFjZURpYWxDb2RlKSB7XHJcbiAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSB0aGlzLl9yZXBsYWNlRGlhbENvZGUobnVtYmVyLCBjb3VudHJ5LmRpYWxDb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnRsTm8gPSBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCkgOiBgYDtcclxuXHJcbiAgICAvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXHJcbiAgICBpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xyXG4gICAgICB0aGlzLnBob25lTnVtYmVyID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcclxuICAgICAgbnVtYmVyOiB0aGlzLnZhbHVlLFxyXG4gICAgICBpbnRlcm5hdGlvbmFsTnVtYmVyOiBpbnRsTm8sXHJcbiAgICAgIG5hdGlvbmFsTnVtYmVyOiBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpIDogJycsXHJcbiAgICAgIGNvdW50cnlDb2RlOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCksXHJcbiAgICAgIGRpYWxDb2RlOiAnKycgKyB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZSxcclxuICAgICAgaWQ6IHRoaXMuaWRcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlbCkge1xyXG4gICAgICBlbC5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRGlhbENvZGUocGhvbmVOdW1iZXI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIHBob25lTnVtYmVyKSB7XHJcbiAgICAgIHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIuc3Vic3RyaW5nKHBob25lTnVtYmVyLmluZGV4T2YoJyAnKSArIDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBob25lTnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVwbGFjZURpYWxDb2RlKHBob25lTnVtYmVyOiBscG4uUGhvbmVOdW1iZXIsIG5ld0NvZGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBkaWFsQ29kZSA9IE51bWJlcihuZXdDb2RlKTtcclxuICAgIGlmICghcGhvbmVOdW1iZXIpIHtcclxuICAgICAgcmV0dXJuIGArJHtuZXdDb2RlfWA7XHJcbiAgICB9XHJcbiAgICBwaG9uZU51bWJlci5zZXRDb3VudHJ5Q29kZShkaWFsQ29kZSk7XHJcbiAgICByZXR1cm4gdGhpcy5waG9uZVV0aWwuZm9ybWF0KHBob25lTnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuRTE2NCk7XHJcbiAgfVxyXG5cclxuICAvLyBhZGp1c3QgaW5wdXQgYWxpZ25tZW50XHJcbiAgcHJpdmF0ZSBjaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpIHtcclxuICAgIGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgdGhpcy5zZWxlY3RlZENvdW50cnkpIHtcclxuICAgICAgY29uc3QgY291bnRyeUNvZGUgPSB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZTtcclxuICAgICAgdGhpcy5zZXBhcmF0ZURpYWxDb2RlQ2xhc3MgPSAnc2VwYXJhdGUtZGlhbC1jb2RlIGl0aS1zZGMtJyArIChjb3VudHJ5Q29kZS5sZW5ndGggKyAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VwYXJhdGVEaWFsQ29kZUNsYXNzID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hcHBseURpYWxDb2RlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnBob25lTnVtYmVyKSB7XHJcbiAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSBgKyR7dGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGV9YDtcclxuICAgICAgdGhpcy5vblBob25lTnVtYmVyQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkJsdXJFdmVudCgpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLm9uQmx1ci5lbWl0KCk7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9ICF0aGlzLmlzRm9jdXNlZDtcclxuICB9XHJcblxyXG4gIG9uRm9jdXNFdmVudCgpOiB2b2lkIHtcclxuICAgIHRoaXMub25Gb2N1cy5lbWl0KCk7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9ICF0aGlzLmlzRm9jdXNlZDtcclxuICAgIGlmICh0aGlzLmFwcGx5Q29kZU9uRm9jdXMpIHtcclxuICAgICAgdGhpcy5fYXBwbHlEaWFsQ29kZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNZW51T3BlbigpOiB2b2lkIHtcclxuICAgIHRoaXMubWVudU9wZW5lZC5lbWl0KCk7XHJcbiAgICB0aGlzLnNlYXJjaEJ1ZmZlciA9ICcnO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XHJcbiAgICAgIHRoaXMubmd4RHJvcGRvd25TZXJ2aWNlLnNjcm9sbFRvQ291bnRyeSh0aGlzLnNlbGVjdGVkQ291bnRyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01lbnVDbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubWVudUNsb3NlZC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBvcGVuRHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICB0aGlzLm5neERyb3Bkb3duU2VydmljZS5vcGVuRnJvbVRlbXBsYXRlKHRoaXMuZHJvcGRvd25UZW1wbGF0ZSwgdGhpcy5jb25uZWN0ZWRFbGVtZW50LCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xyXG4gICAgdGhpcy5pc01lbnVPcGVuKCk7XHJcbiAgfVxyXG5cclxuICBvbkNsZWFyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMucGhvbmVOdW1iZXIgPSAnJztcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG51bGwpO1xyXG4gICAgdGhpcy5jbGVhci5lbWl0KCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJuZ3gtaW50bC10ZWxcIlxyXG4gICAgIFtjbGFzcy5uZ3gtaW50bC10ZWxfc3Ryb2tlZF09XCJzdHJva2VkXCJcclxuICAgICBbY2xhc3Mubmd4LWludGwtdGVsX2Vycm9yXT1cImludmFsaWQgJiYgKGRpcnR5QW5kVG91Y2hlZCB8fCAobmd4SW50bFRlbEZvcm0uc3VibWl0dGVkJCB8IGFzeW5jKSlcIlxyXG4gICAgIFtjbGFzcy5uZ3gtaW50bC10ZWxfb3BlbmVkXT1cIm5neERyb3Bkb3duU2VydmljZS5tZW51U3RhdGUkIHwgYXN5bmNcIlxyXG4gICAgIFtjbGFzcy5uZ3gtaW50bC10ZWxfZm9jdXNdPVwiaXNGb2N1c2VkXCI+XHJcbiAgICA8bmd4LWludGwtdGVsLXRyaWdnZXIgKm5nSWY9XCIhZGlzYWJsZUNvdW50cnlTZWxlY3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibmd4LWludGwtdGVsX190cmlnZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3Mubmd4LWludGwtdGVsX190cmlnZ2VyX3NtYWxsXT1cInNtYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAjY29ubmVjdGVkRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtjb3VudHJ5XT1cInNlbGVjdGVkQ291bnRyeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzRXJyb3JdPVwiaW52YWxpZCAmJiAoZGlydHlBbmRUb3VjaGVkIHx8IChuZ3hJbnRsVGVsRm9ybS5zdWJtaXR0ZWQkIHwgYXN5bmMpKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzTWVudU9wZW5lZF09XCJuZ3hEcm9wZG93blNlcnZpY2UubWVudVN0YXRlJCB8IGFzeW5jXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcEZpZWxkXT1cInRvb2x0aXBGaWVsZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0cm9rZWRdPVwic3Ryb2tlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5Ecm9wZG93bigpXCI+XHJcbiAgICA8L25neC1pbnRsLXRlbC10cmlnZ2VyPlxyXG4gICAgPG1hdC1mb3JtLWZpZWxkIFtmbG9hdExhYmVsXT1cImZsb2F0TGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibmd4LWludGwtdGVsX19mb3JtLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgICBbY2xhc3Mubmd4LWludGwtdGVsX19mb3JtLWZpZWxkX3NtYWxsXT1cInNtYWxsXCI+XHJcbiAgICAgICAgPG1hdC1sYWJlbCBjbGFzcz1cIm5neC1pbnRsLXRlbF9fbGFiZWxcIj5cclxuICAgICAgICAgICAge3sgaW5wdXRMYWJlbCB9fVxyXG4gICAgICAgIDwvbWF0LWxhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIm5neC1pbnRsLXRlbF9faW5wdXRcIlxyXG4gICAgICAgICAgICAgICAjZm9jdXNhYmxlXHJcbiAgICAgICAgICAgICAgIG1hdElucHV0XHJcbiAgICAgICAgICAgICAgIHR5cGU9XCJ0ZWxcIlxyXG4gICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxyXG4gICAgICAgICAgICAgICBbaWRdPVwiaWRcIlxyXG4gICAgICAgICAgICAgICBbbmdDbGFzc109XCJjc3NDbGFzc1wiXHJcbiAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJyZW1vdmVEaWFsQ29kZShzZWxlY3RlZENvdW50cnk/LnBsYWNlSG9sZGVyIHx8ICcnKVwiXHJcbiAgICAgICAgICAgICAgIFthdHRyLm1heExlbmd0aF09XCJtYXhMZW5ndGhcIlxyXG4gICAgICAgICAgICAgICBbYXR0ci52YWxpZGF0aW9uXT1cInBob25lVmFsaWRhdGlvblwiXHJcbiAgICAgICAgICAgICAgIFtlcnJvclN0YXRlTWF0Y2hlcl09XCJlcnJvclN0YXRlTWF0Y2hlclwiXHJcbiAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicGhvbmVOdW1iZXJcIlxyXG4gICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvblBob25lTnVtYmVyQ2hhbmdlKClcIlxyXG4gICAgICAgICAgICAgICAoYmx1cik9XCJvbkJsdXJFdmVudCgpXCJcclxuICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXNFdmVudCgpXCJcclxuICAgICAgICAgICAgICAgKGtleWRvd24pPVwibmd4SW50bFRlbElucHV0U2VydmljZS5vbklucHV0S2V5UHJlc3MoJGV2ZW50KVwiPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJjbGVhckljb25cIlxyXG4gICAgICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXHJcbiAgICAgICAgICAgICAgICBtYXRTdWZmaXhcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsZWFyQ2xpY2soJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3sgY2xlYXJJY29uIH19PC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwibWF0RXJyb3JDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIGhhc0Vycm9yXCI+XHJcbiAgICAgICAgICAgIHt7IChlcnJvcnMgJiYgZXJyb3JzW2Vycm9yS2V5XSkgfHwgY29udHJvbC5nZXRFcnJvcihlcnJvcktleSkgfX1cclxuICAgICAgICA8L21hdC1lcnJvcj5cclxuICAgICAgICA8ZGl2ICNtYXRFcnJvckNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LWVycm9yXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UZW1wbGF0ZT5cclxuICAgICAgICA8ZGl2IFtjbGFzc109XCJkcm9wZG93bkNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxuZ3gtaW50bC10ZWwtY291bnRyeSBbY291bnRyaWVzXT1cInByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Ryb3Bkb3duUGFyYW1zXT1cImRyb3Bkb3duUGFyYW1zRGF0YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3Ryb2tlZF09XCJzdHJva2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb3VudHJ5Q2xpY2spPVwib25Db3VudHJ5U2VsZWN0KCRldmVudCwgZm9jdXNhYmxlKVwiPlxyXG4gICAgICAgICAgICA8L25neC1pbnRsLXRlbC1jb3VudHJ5PlxyXG4gICAgICAgICAgICA8bWF0LWRpdmlkZXIgKm5nSWY9XCJwcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duPy5sZW5ndGhcIj48L21hdC1kaXZpZGVyPlxyXG4gICAgICAgICAgICA8bmd4LWludGwtdGVsLWNvdW50cnkgW2NvdW50cmllc109XCJuZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmFsbENvdW50cmllc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZHJvcGRvd25QYXJhbXNdPVwiZHJvcGRvd25QYXJhbXNEYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHJva2VkXT1cInN0cm9rZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvdW50cnlDbGljayk9XCJvbkNvdW50cnlTZWxlY3QoJGV2ZW50LCBmb2N1c2FibGUpXCI+XHJcbiAgICAgICAgICAgIDwvbmd4LWludGwtdGVsLWNvdW50cnk+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG48L2Rpdj5cclxuIl19