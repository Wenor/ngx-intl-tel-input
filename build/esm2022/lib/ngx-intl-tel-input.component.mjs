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
import * as i7 from "@angular/material/form-field";
import * as i8 from "@angular/material/input";
import * as i9 from "@angular/material/button";
import * as i10 from "@angular/material/divider";
import * as i11 from "./components/ngx-intl-tel-trigger/ngx-intl-tel-trigger.component";
import * as i12 from "./components/ngx-intl-tel-country/ngx-intl-tel-country.component";
import * as i13 from "@angular/material/icon";
let ngxIntlTelInputId = 0;
export class NgxIntlTelInputComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputComponent, deps: [{ token: i1.NgxIntlTelInputService }, { token: i2.NgxIntlTelFormService }, { token: i3.NgxDropdownService }, { token: i4.NgxIntlTelModelAdapter }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.10", type: NgxIntlTelInputComponent, selector: "ngx-intl-tel-input", inputs: { value: "value", small: "small", preferredCountries: "preferredCountries", enablePlaceholder: "enablePlaceholder", cssClass: "cssClass", onlyCountries: "onlyCountries", id: "id", enableAutoCountrySelect: "enableAutoCountrySelect", maxLength: "maxLength", tooltipField: "tooltipField", selectFirstCountry: "selectFirstCountry", selectedCountryISO: "selectedCountryISO", phoneValidation: "phoneValidation", floatLabel: "floatLabel", inputLabel: "inputLabel", separateDialCode: "separateDialCode", replaceDialCode: "replaceDialCode", stroked: "stroked", isFocused: "isFocused", applyCodeOnFocus: "applyCodeOnFocus", disableCountrySelect: "disableCountrySelect", dropdownClass: "dropdownClass", dropdownParams: "dropdownParams", errors: "errors", clearable: "clearable" }, outputs: { countryChange: "countryChange", onBlur: "onBlur", onFocus: "onFocus", menuClosed: "menuClosed", menuOpened: "menuOpened", clear: "clear" }, host: { listeners: { "window:keypress": "onKeyPress($event)" } }, providers: [
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
        ], viewQueries: [{ propertyName: "dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true, static: true }, { propertyName: "connectedElement", first: true, predicate: ["connectedElement"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"ngx-intl-tel\"\r\n     [class.ngx-intl-tel_stroked]=\"stroked\"\r\n     [class.ngx-intl-tel_error]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n     [class.ngx-intl-tel_opened]=\"ngxDropdownService.menuState$ | async\"\r\n     [class.ngx-intl-tel_focus]=\"isFocused\">\r\n    <ngx-intl-tel-trigger *ngIf=\"!disableCountrySelect\"\r\n                          class=\"ngx-intl-tel__trigger\"\r\n                          [class.ngx-intl-tel__trigger_small]=\"small\"\r\n                          #connectedElement\r\n                          [country]=\"selectedCountry\"\r\n                          [isError]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n                          [isMenuOpened]=\"ngxDropdownService.menuState$ | async\"\r\n                          [tooltipField]=\"tooltipField\"\r\n                          [stroked]=\"stroked\"\r\n                          (click)=\"openDropdown()\">\r\n    </ngx-intl-tel-trigger>\r\n    <mat-form-field [floatLabel]=\"floatLabel\"\r\n                    class=\"ngx-intl-tel__form-field\"\r\n                    [class.ngx-intl-tel__form-field_small]=\"small\">\r\n        <mat-label class=\"ngx-intl-tel__label\">\r\n            {{ inputLabel }}\r\n        </mat-label>\r\n        <input class=\"ngx-intl-tel__input\"\r\n               #focusable\r\n               matInput\r\n               type=\"tel\"\r\n               autocomplete=\"off\"\r\n               [id]=\"id\"\r\n               [ngClass]=\"cssClass\"\r\n               [disabled]=\"disabled\"\r\n               [placeholder]=\"removeDialCode(selectedCountry?.placeHolder || '')\"\r\n               [attr.maxLength]=\"maxLength\"\r\n               [attr.validation]=\"phoneValidation\"\r\n               [errorStateMatcher]=\"errorStateMatcher\"\r\n               [(ngModel)]=\"phoneNumber\"\r\n               (ngModelChange)=\"onPhoneNumberChange()\"\r\n               (blur)=\"onBlurEvent()\"\r\n               (focus)=\"onFocusEvent()\"\r\n               (keydown)=\"ngxIntlTelInputService.onInputKeyPress($event)\">\r\n        <button *ngIf=\"clearIcon\"\r\n                mat-icon-button\r\n                matSuffix\r\n                (click)=\"onClearClick($event)\">\r\n            <mat-icon>{{ clearIcon }}</mat-icon>\r\n        </button>\r\n        <mat-error *ngIf=\"matErrorContainer.children.length === 0 && hasError\">\r\n            {{ (errors && errors[errorKey]) || control.getError(errorKey) }}\r\n        </mat-error>\r\n        <div #matErrorContainer>\r\n            <ng-content select=\"mat-error\"></ng-content>\r\n        </div>\r\n    </mat-form-field>\r\n    <ng-template #dropdownTemplate>\r\n        <div [class]=\"dropdownClass\">\r\n            <ngx-intl-tel-country [countries]=\"preferredCountriesInDropDown\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n            <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\r\n            <ngx-intl-tel-country [countries]=\"ngxIntlTelInputService.allCountries\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n        </div>\r\n    </ng-template>\r\n</div>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel{display:flex;width:100%;border-radius:0 8px 8px 0}.ngx-intl-tel__input:focus{box-shadow:none!important}.ngx-intl-tel_stroked .mat-mdc-form-field.mat-form-field-should-float .mat-form-field-label{transform:translateY(-1.05em) scale(.75)!important}.ngx-intl-tel_stroked .ngx-intl-tel__trigger{height:56px;transition:.3s ease-in-out;z-index:2}.ngx-intl-tel_stroked .ngx-intl-tel__trigger_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__label{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:16px;color:var(--ngx-intl-tel-color-label)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-text);height:56px;width:100%;border:1px solid var(--ngx-intl-tel-color-border);transform:translate(-1px);border-radius:0 8px 8px 0;padding-left:13px;transition:.3s ease-in-out;z-index:1;box-sizing:border-box}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field{--mat-icon-button-touch-target-display: none;--mdc-filled-text-field-container-color: transparent;padding-left:0;position:relative}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-icon-button.mat-mdc-button-base{--mdc-icon-button-state-layer-size: 32px;width:var(--mdc-icon-button-state-layer-size);height:var(--mdc-icon-button-state-layer-size);padding:4px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-form-field-focus-overlay,.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mdc-line-ripple{display:none}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-form-field-icon-suffix{margin-right:4px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-form-field-subscript-wrapper{position:absolute;top:100%}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix{padding:.4375em 0!important;border-top:.84375em solid transparent!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field:hover{border:1px solid var(--ngx-intl-tel-color-border-hover);z-index:10;cursor:pointer}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper{padding-bottom:0}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix{padding:.6375em 0;border-top:.9375em solid transparent}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-form-field-underline{display:none}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element{caret-color:var(--ngx-intl-tel-color-text);line-height:20px;color:var(--ngx-intl-tel-color-text)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element::placeholder{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-placeholder)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .form-control:focus{border-color:unset!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-subscript-wrapper{margin-top:var(--mat-subscript-wrapper-margin-top)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-form-field-error{font-family:Source Sans Pro,sans-serif;font-size:10px;font-weight:400;line-height:13px;color:var(--ngx-intl-tel-error-color);margin-top:var(--mat-error-margin-top)!important}.ngx-intl-tel_stroked.ngx-intl-tel_opened,.ngx-intl-tel_stroked.ngx-intl-tel_focus{box-shadow:0 5px 24px #39415c26}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__label{color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field{border-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element{caret-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element::placeholder{color:var(--ngx-intl-tel-error-color);opacity:.7}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field:hover{border-color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel__dropdown{max-height:288px!important;overflow-y:auto}.ngx-intl-tel__dropdown-stroked{height:176px;width:96px;border:solid 1px var(--ngx-intl-tel-color-border-hover);border-radius:0 0 8px 8px!important;overflow:auto}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i7.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i7.MatLabel, selector: "mat-label" }, { kind: "directive", type: i7.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i9.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i10.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: i11.NgxIntlTelTriggerComponent, selector: "ngx-intl-tel-trigger", inputs: ["country", "showCode", "stroked", "tooltipField", "isMenuOpened", "isError"] }, { kind: "component", type: i12.NgxIntlTelCountryComponent, selector: "ngx-intl-tel-country", inputs: ["countries", "dropdownParams", "stroked"], outputs: ["countryClick"] }, { kind: "component", type: i13.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputComponent, decorators: [{
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
                    ], template: "<div class=\"ngx-intl-tel\"\r\n     [class.ngx-intl-tel_stroked]=\"stroked\"\r\n     [class.ngx-intl-tel_error]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n     [class.ngx-intl-tel_opened]=\"ngxDropdownService.menuState$ | async\"\r\n     [class.ngx-intl-tel_focus]=\"isFocused\">\r\n    <ngx-intl-tel-trigger *ngIf=\"!disableCountrySelect\"\r\n                          class=\"ngx-intl-tel__trigger\"\r\n                          [class.ngx-intl-tel__trigger_small]=\"small\"\r\n                          #connectedElement\r\n                          [country]=\"selectedCountry\"\r\n                          [isError]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n                          [isMenuOpened]=\"ngxDropdownService.menuState$ | async\"\r\n                          [tooltipField]=\"tooltipField\"\r\n                          [stroked]=\"stroked\"\r\n                          (click)=\"openDropdown()\">\r\n    </ngx-intl-tel-trigger>\r\n    <mat-form-field [floatLabel]=\"floatLabel\"\r\n                    class=\"ngx-intl-tel__form-field\"\r\n                    [class.ngx-intl-tel__form-field_small]=\"small\">\r\n        <mat-label class=\"ngx-intl-tel__label\">\r\n            {{ inputLabel }}\r\n        </mat-label>\r\n        <input class=\"ngx-intl-tel__input\"\r\n               #focusable\r\n               matInput\r\n               type=\"tel\"\r\n               autocomplete=\"off\"\r\n               [id]=\"id\"\r\n               [ngClass]=\"cssClass\"\r\n               [disabled]=\"disabled\"\r\n               [placeholder]=\"removeDialCode(selectedCountry?.placeHolder || '')\"\r\n               [attr.maxLength]=\"maxLength\"\r\n               [attr.validation]=\"phoneValidation\"\r\n               [errorStateMatcher]=\"errorStateMatcher\"\r\n               [(ngModel)]=\"phoneNumber\"\r\n               (ngModelChange)=\"onPhoneNumberChange()\"\r\n               (blur)=\"onBlurEvent()\"\r\n               (focus)=\"onFocusEvent()\"\r\n               (keydown)=\"ngxIntlTelInputService.onInputKeyPress($event)\">\r\n        <button *ngIf=\"clearIcon\"\r\n                mat-icon-button\r\n                matSuffix\r\n                (click)=\"onClearClick($event)\">\r\n            <mat-icon>{{ clearIcon }}</mat-icon>\r\n        </button>\r\n        <mat-error *ngIf=\"matErrorContainer.children.length === 0 && hasError\">\r\n            {{ (errors && errors[errorKey]) || control.getError(errorKey) }}\r\n        </mat-error>\r\n        <div #matErrorContainer>\r\n            <ng-content select=\"mat-error\"></ng-content>\r\n        </div>\r\n    </mat-form-field>\r\n    <ng-template #dropdownTemplate>\r\n        <div [class]=\"dropdownClass\">\r\n            <ngx-intl-tel-country [countries]=\"preferredCountriesInDropDown\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n            <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\r\n            <ngx-intl-tel-country [countries]=\"ngxIntlTelInputService.allCountries\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n        </div>\r\n    </ng-template>\r\n</div>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel{display:flex;width:100%;border-radius:0 8px 8px 0}.ngx-intl-tel__input:focus{box-shadow:none!important}.ngx-intl-tel_stroked .mat-mdc-form-field.mat-form-field-should-float .mat-form-field-label{transform:translateY(-1.05em) scale(.75)!important}.ngx-intl-tel_stroked .ngx-intl-tel__trigger{height:56px;transition:.3s ease-in-out;z-index:2}.ngx-intl-tel_stroked .ngx-intl-tel__trigger_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__label{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:16px;color:var(--ngx-intl-tel-color-label)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-text);height:56px;width:100%;border:1px solid var(--ngx-intl-tel-color-border);transform:translate(-1px);border-radius:0 8px 8px 0;padding-left:13px;transition:.3s ease-in-out;z-index:1;box-sizing:border-box}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field{--mat-icon-button-touch-target-display: none;--mdc-filled-text-field-container-color: transparent;padding-left:0;position:relative}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-icon-button.mat-mdc-button-base{--mdc-icon-button-state-layer-size: 32px;width:var(--mdc-icon-button-state-layer-size);height:var(--mdc-icon-button-state-layer-size);padding:4px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-form-field-focus-overlay,.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mdc-line-ripple{display:none}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-form-field-icon-suffix{margin-right:4px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field.mat-mdc-form-field .mat-mdc-form-field-subscript-wrapper{position:absolute;top:100%}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small{height:48px}.ngx-intl-tel_stroked .ngx-intl-tel__form-field_small .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix{padding:.4375em 0!important;border-top:.84375em solid transparent!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field:hover{border:1px solid var(--ngx-intl-tel-color-border-hover);z-index:10;cursor:pointer}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper{padding-bottom:0}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix{padding:.6375em 0;border-top:.9375em solid transparent}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-form-field-underline{display:none}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element{caret-color:var(--ngx-intl-tel-color-text);line-height:20px;color:var(--ngx-intl-tel-color-text)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element::placeholder{font-family:Source Sans Pro,sans-serif;font-size:16px;font-weight:400;line-height:20px;color:var(--ngx-intl-tel-color-placeholder)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .form-control:focus{border-color:unset!important}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-subscript-wrapper{margin-top:var(--mat-subscript-wrapper-margin-top)}.ngx-intl-tel_stroked .ngx-intl-tel__form-field .mat-mdc-form-field-error{font-family:Source Sans Pro,sans-serif;font-size:10px;font-weight:400;line-height:13px;color:var(--ngx-intl-tel-error-color);margin-top:var(--mat-error-margin-top)!important}.ngx-intl-tel_stroked.ngx-intl-tel_opened,.ngx-intl-tel_stroked.ngx-intl-tel_focus{box-shadow:0 5px 24px #39415c26}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__label{color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field{border-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element{caret-color:var(--ngx-intl-tel-error-color);color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field .mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-form-field-infix .mat-mdc-input-element::placeholder{color:var(--ngx-intl-tel-error-color);opacity:.7}.ngx-intl-tel_stroked.ngx-intl-tel_error .ngx-intl-tel__form-field:hover{border-color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel__dropdown{max-height:288px!important;overflow-y:auto}.ngx-intl-tel__dropdown-stroked{height:176px;width:96px;border:solid 1px var(--ngx-intl-tel-color-border-hover);border-radius:0 0 8px 8px!important;overflow:auto}\n"] }]
        }], ctorParameters: () => [{ type: i1.NgxIntlTelInputService }, { type: i2.NgxIntlTelFormService }, { type: i3.NgxDropdownService }, { type: i4.NgxIntlTelModelAdapter }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i0.Injector }], propDecorators: { onKeyPress: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW50bC10ZWwtaW5wdXQvc3JjL2xpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBR0wsTUFBTSxFQUVOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoSCxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSTFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FB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ZCxLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFJTixTQUFTO3NCQURSLEtBQUs7Z0JBSU4sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBSU4sb0JBQW9CO3NCQURuQixLQUFLO2dCQUlGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBT0YsY0FBYztzQkFEakIsS0FBSztnQkFRTixNQUFNO3NCQURMLEtBQUs7Z0JBSUYsU0FBUztzQkFEWixLQUFLO2dCQWFOLGFBQWE7c0JBRFosTUFBTTtnQkFJUCxNQUFNO3NCQURMLE1BQU07Z0JBSVAsT0FBTztzQkFETixNQUFNO2dCQUlQLFVBQVU7c0JBRFQsTUFBTTtnQkFJUCxVQUFVO3NCQURULE1BQU07Z0JBSVAsS0FBSztzQkFESixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3RvcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRXJyb3JTdGF0ZU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcclxuaW1wb3J0ICogYXMgbHBuIGZyb20gJ2dvb2dsZS1saWJwaG9uZW51bWJlcic7XHJcbmltcG9ydCB7IENvdW50cnlDb2RlIH0gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XHJcbmltcG9ydCB7IENvdW50cnlEcm9wZG93bkRpc3BsYXlPcHRpb25zIH0gZnJvbSAnLi9lbnVtcy9jb3VudHJ5LWRyb3Bkb3duLWRpc3BsYXktb3B0aW9ucy5lbnVtJztcclxuaW1wb3J0IHsgQ291bnRyeUlTTyB9IGZyb20gJy4vZW51bXMvY291bnRyeS1pc28uZW51bSc7XHJcbmltcG9ydCB7IFNlYXJjaENvdW50cnlGaWVsZCB9IGZyb20gJy4vZW51bXMvc2VhcmNoLWNvdW50cnktZmllbGQuZW51bSc7XHJcbmltcG9ydCB7IFRvb2x0aXBMYWJlbCB9IGZyb20gJy4vZW51bXMvdG9vbHRpcC1sYWJlbC5lbnVtJztcclxuaW1wb3J0IHsgSU5neEludGxUZWxJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9uZ3gtaW50bC10ZWwtaW5wdXQtY29tcG9uZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvdW50cnkgfSBmcm9tICcuL21vZGVsL2NvdW50cnkubW9kZWwnO1xyXG5pbXBvcnQgeyBJbnRsVGVsTW9kZWwgfSBmcm9tICcuL21vZGVsL2ludGwtdGVsLm1vZGVsJztcclxuaW1wb3J0IHsgcGhvbmVOdW1iZXJWYWxpZGF0b3IgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBOZ3hEcm9wZG93blNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1kcm9wZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtZm9ybS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbElucHV0RXJyb3JNYXRjaGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtaW5wdXQtZXJyb3ItbWF0Y2hlcic7XHJcbmltcG9ydCB7IE5neEludGxUZWxJbnB1dFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1pbnRsLXRlbC1pbnB1dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbE1vZGVsQWRhcHRlciB9IGZyb20gJy4vc2VydmljZXMvbmd4LWludGwtdGVsLW1vZGVsLWFkYXB0ZXInO1xyXG5cclxubGV0IG5neEludGxUZWxJbnB1dElkID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWludGwtdGVsLWlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ291bnRyeUNvZGUsXHJcbiAgICBOZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLFxyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEludGxUZWxJbnB1dENvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VGYWN0b3J5OiAobmd4SW50bFRlbElucHV0Q29tcG9uZW50OiBJTmd4SW50bFRlbElucHV0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgICAgbmd4SW50bFRlbE1vZGVsQWRhcHRlcjogTmd4SW50bFRlbE1vZGVsQWRhcHRlcjx1bmtub3duPikgPT4ge1xyXG4gICAgICAgIHJldHVybiBwaG9uZU51bWJlclZhbGlkYXRvcihuZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQsIG5neEludGxUZWxNb2RlbEFkYXB0ZXIpO1xyXG4gICAgICB9LFxyXG4gICAgICBkZXBzOiBbTmd4SW50bFRlbElucHV0Q29tcG9uZW50LCBOZ3hJbnRsVGVsTW9kZWxBZGFwdGVyXSxcclxuICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBJTmd4SW50bFRlbElucHV0Q29tcG9uZW50IHtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXByZXNzJywgWyckZXZlbnQnXSlcclxuICBvbktleVByZXNzKCRldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKC9bXFxkYS16QS1a0LAt0Y/QkC3Qr9GW0IbRl9CH0ZTQhF0vLnRlc3QoJGV2ZW50LmtleSkgJiYgdGhpcy5uZ3hEcm9wZG93blNlcnZpY2UuZ2V0TWVudVN0YXRlKCkpIHtcclxuICAgICAgdGhpcy5zZWFyY2hCdWZmZXIgPSBgJHt0aGlzLnNlYXJjaEJ1ZmZlcn0keyRldmVudC5rZXl9YDtcclxuICAgICAgY29uc3QgY291bnRyaWVzID0gdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLnNlYXJjaENvdW50cnkodGhpcy5zZWFyY2hCdWZmZXIsIFtTZWFyY2hDb3VudHJ5RmllbGQuQWxsXSk7XHJcbiAgICAgIGlmIChjb3VudHJpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hCdWZmZXIgPSAnJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5neERyb3Bkb3duU2VydmljZS5zY3JvbGxUb0NvdW50cnkoY291bnRyaWVzWzBdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25UZW1wbGF0ZScsIHtzdGF0aWM6IHRydWV9KVxyXG4gIGRyb3Bkb3duVGVtcGxhdGU6IFRlbXBsYXRlUmVmPEhUTUxEaXZFbGVtZW50PjtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY29ubmVjdGVkRWxlbWVudCcsIHtzdGF0aWM6IGZhbHNlLCByZWFkOiBFbGVtZW50UmVmfSlcclxuICBjb25uZWN0ZWRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcclxuXHJcbiAgQElucHV0KClcclxuICB2YWx1ZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc21hbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBwcmVmZXJyZWRDb3VudHJpZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZW5hYmxlUGxhY2Vob2xkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNzc0NsYXNzOiBzdHJpbmcgPSAnZm9ybS1jb250cm9sJztcclxuXHJcbiAgQElucHV0KClcclxuICBvbmx5Q291bnRyaWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGlkOiBzdHJpbmcgPSBgbmd4LWludGwtdGVsLWlucHV0LWlkLSR7bmd4SW50bFRlbElucHV0SWQrK31gO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBtYXhMZW5ndGg6IG51bWJlciB8IHN0cmluZyA9ICcnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHRvb2x0aXBGaWVsZDogVG9vbHRpcExhYmVsO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNlbGVjdEZpcnN0Q291bnRyeTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2VsZWN0ZWRDb3VudHJ5SVNPOiBDb3VudHJ5SVNPO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHBob25lVmFsaWRhdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnYWx3YXlzJztcclxuXHJcbiAgQElucHV0KClcclxuICBpbnB1dExhYmVsOiBzdHJpbmcgPSAnUGhvbmUgbnVtYmVyJztcclxuXHJcbiAgQElucHV0KClcclxuICBzZXBhcmF0ZURpYWxDb2RlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcmVwbGFjZURpYWxDb2RlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzdHJva2VkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGlzRm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGFwcGx5Q29kZU9uRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRpc2FibGVDb3VudHJ5U2VsZWN0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRyb3Bkb3duQ2xhc3MocGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10pIHtcclxuICAgIGNvbnN0IGNsYXNzZXMgPSAodHlwZW9mIHBhbmVsQ2xhc3MgPT09ICdzdHJpbmcnKSA/IFtwYW5lbENsYXNzXSA6IHBhbmVsQ2xhc3M7XHJcbiAgICB0aGlzLl9kcm9wZG93blBhbmVsQ2xhc3MucHVzaCguLi5jbGFzc2VzKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRyb3Bkb3duUGFyYW1zKHBhcmFtczogQ291bnRyeURyb3Bkb3duRGlzcGxheU9wdGlvbnNbXSkge1xyXG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25QYXJhbXNEYXRhID0gcGFyYW1zO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBlcnJvcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNsZWFyYWJsZShpY29uOiBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgaWNvbiA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghaWNvbikge1xyXG4gICAgICB0aGlzLmNsZWFySWNvbiA9ICdjbG9zZSc7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuY2xlYXJJY29uID0gaWNvbjtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIGNvdW50cnlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENvdW50cnk+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uQmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25Gb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgbWVudUNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgbWVudU9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgY2xlYXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGdldCBkcm9wZG93bkNsYXNzKCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIC4uLnRoaXMuX2Ryb3Bkb3duUGFuZWxDbGFzcyxcclxuICAgICAgLi4uKHRoaXMuc3Ryb2tlZCA/IFsnbmd4LWludGwtdGVsX19kcm9wZG93bi1zdHJva2VkJ10gOiBbJ25neC1pbnRsLXRlbF9fZHJvcGRvd24nXSlcclxuICAgIF0uam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVycm9yU3RhdGVNYXRjaGVyKCk6IEVycm9yU3RhdGVNYXRjaGVyIHtcclxuICAgIHJldHVybiBuZXcgTmd4SW50bFRlbElucHV0RXJyb3JNYXRjaGVyKHRoaXMuY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXJyb3JLZXkoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGtleXMgPSB0aGlzLmNvbnRyb2wuZXJyb3JzICYmIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbC5lcnJvcnMpO1xyXG4gICAgcmV0dXJuIGtleXMgJiYga2V5cy5sZW5ndGggIT09IDAgPyBrZXlzWzBdIDogJyc7XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzRXJyb3IoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMuY29udHJvbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jb250cm9sLmhhc0Vycm9yKHRoaXMuZXJyb3JLZXkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGludmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb250cm9sICYmIHRoaXMuY29udHJvbC5pbnZhbGlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRpcnR5QW5kVG91Y2hlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnRyb2wuZGlydHkgJiYgdGhpcy5jb250cm9sLnRvdWNoZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9kcm9wZG93blBhbmVsQ2xhc3M6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIHNlbGVjdGVkQ291bnRyeTogQ291bnRyeSA9IHtcclxuICAgIGFyZWFDb2RlczogdW5kZWZpbmVkLFxyXG4gICAgZGlhbENvZGU6ICcnLFxyXG4gICAgZmxhZ0NsYXNzOiAnJyxcclxuICAgIGlzbzI6ICcnLFxyXG4gICAgbmFtZTogJycsXHJcbiAgICBwbGFjZUhvbGRlcjogJycsXHJcbiAgICBwcmlvcml0eTogMFxyXG4gIH07XHJcblxyXG4gIHNlYXJjaEJ1ZmZlcjogc3RyaW5nID0gJyc7XHJcblxyXG4gIHNlcGFyYXRlRGlhbENvZGVDbGFzczogc3RyaW5nO1xyXG5cclxuICBwaG9uZU51bWJlciA9ICcnO1xyXG5cclxuICBwcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xyXG4gIC8vIEhhcyB0byBiZSAnYW55JyB0byBwcmV2ZW50IGEgbmVlZCB0byBpbnN0YWxsIEB0eXBlcy9nb29nbGUtbGlicGhvbmVudW1iZXIgYnkgdGhlIHBhY2thZ2UgdXNlci4uLlxyXG4gIHBob25lVXRpbDogYW55ID0gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBjbGVhckljb246IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIGRyb3Bkb3duUGFyYW1zRGF0YTogQ291bnRyeURyb3Bkb3duRGlzcGxheU9wdGlvbnNbXSA9IFtcclxuICAgIENvdW50cnlEcm9wZG93bkRpc3BsYXlPcHRpb25zLkRpYWwsXHJcbiAgICBDb3VudHJ5RHJvcGRvd25EaXNwbGF5T3B0aW9ucy5GbGFnLFxyXG4gICAgQ291bnRyeURyb3Bkb3duRGlzcGxheU9wdGlvbnMuTmFtZVxyXG4gIF07XHJcblxyXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xyXG5cclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAobW9kZWw6IEludGxUZWxNb2RlbCB8IG51bGwpID0+IHt9O1xyXG5cclxuICBjb250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG5neEludGxUZWxJbnB1dFNlcnZpY2U6IE5neEludGxUZWxJbnB1dFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IG5neEludGxUZWxGb3JtOiBOZ3hJbnRsVGVsRm9ybVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IG5neERyb3Bkb3duU2VydmljZTogTmd4RHJvcGRvd25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmd4SW50bFRlbE1vZGVsQWRhcHRlcjogTmd4SW50bFRlbE1vZGVsQWRhcHRlcjx1bmtub3duPixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gICAgdGhpcy5uZ3hEcm9wZG93blNlcnZpY2Uub25NZW51Q2xvc2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuaXNNZW51Q2xvc2UoKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAodGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmFsbENvdW50cmllcyAmJiBjaGFuZ2VzWydzZWxlY3RlZENvdW50cnlJU08nXVxyXG4gICAgICAmJiBjaGFuZ2VzWydzZWxlY3RlZENvdW50cnlJU08nXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddLnByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgdGhpcy5nZXRTZWxlY3RlZENvdW50cnkoKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzLnByZWZlcnJlZENvdW50cmllcykge1xyXG4gICAgICB0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24gPSB0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuZ2V0UHJlZmVycmVkQ291bnRyaWVzKHRoaXMucHJlZmVycmVkQ291bnRyaWVzKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG5nQ29udHJvbDogTmdDb250cm9sID0gdGhpcy5pbmplY3Rvci5nZXQoTmdDb250cm9sLCBudWxsKTtcclxuICAgIGlmIChuZ0NvbnRyb2wpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gbmdDb250cm9sLmNvbnRyb2wgYXMgRm9ybUNvbnRyb2w7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IChtb2RlbCkgPT4ge1xyXG4gICAgICBmbih0aGlzLm5neEludGxUZWxNb2RlbEFkYXB0ZXIubGliUGhvbmVOdW1iZXJNb2RlbFRvQ29udHJvbFZhbHVlKG1vZGVsKSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnBob25lTnVtYmVyID0gdGhpcy5uZ3hJbnRsVGVsTW9kZWxBZGFwdGVyLmNvbnRyb2xWYWx1ZVRvU3RyaW5nKG9iaik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmZldGNoQ291bnRyeURhdGEodGhpcy5lbmFibGVQbGFjZWhvbGRlcik7XHJcbiAgICBpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93biA9IHRoaXMubmd4SW50bFRlbElucHV0U2VydmljZS5nZXRQcmVmZXJyZWRDb3VudHJpZXModGhpcy5wcmVmZXJyZWRDb3VudHJpZXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub25seUNvdW50cmllcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLnNldENvdW50cmllcyh0aGlzLm9ubHlDb3VudHJpZXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2VsZWN0Rmlyc3RDb3VudHJ5KSB7XHJcbiAgICAgIGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkodGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duWzBdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkQ291bnRyeSh0aGlzLm5neEludGxUZWxJbnB1dFNlcnZpY2UuYWxsQ291bnRyaWVzWzBdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5nZXRTZWxlY3RlZENvdW50cnkoKTtcclxuICAgIHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuICAgIHRoaXMub25Db3VudHJ5U2VsZWN0KHRoaXMuc2VsZWN0ZWRDb3VudHJ5KTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5OiBDb3VudHJ5KTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IGNvdW50cnk7XHJcbiAgICB0aGlzLmNvdW50cnlDaGFuZ2UuZW1pdChjb3VudHJ5KTtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGVkQ291bnRyeSgpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkQ291bnRyeUlTTykge1xyXG4gICAgICBjb25zdCBjb3VudHJ5ID0gdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmFsbENvdW50cmllcy5maW5kKGMgPT4ge1xyXG4gICAgICAgIHJldHVybiAoYy5pc28yLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuc2VsZWN0ZWRDb3VudHJ5SVNPLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkoY291bnRyeSk7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ291bnRyeSkge1xyXG4gICAgICAgIGlmICh0aGlzLnBob25lTnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblBob25lTnVtYmVyQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XHJcblxyXG4gICAgbGV0IG51bWJlcjogbHBuLlBob25lTnVtYmVyO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UodGhpcy5waG9uZU51bWJlciwgdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY291bnRyeUNvZGUgPSB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xyXG4gICAgLy8gYXV0byBzZWxlY3QgY291bnRyeSBiYXNlZCBvbiB0aGUgZXh0ZW5zaW9uIChhbmQgYXJlYUNvZGUgaWYgbmVlZGVkKSAoZS5nLiBzZWxlY3QgQ2FuYWRhIGlmIG51bWJlciBzdGFydHMgd2l0aCArMSA0MTYpXHJcbiAgICBpZiAodGhpcy5lbmFibGVBdXRvQ291bnRyeVNlbGVjdCkge1xyXG4gICAgICBjb3VudHJ5Q29kZSA9IG51bWJlciAmJiBudW1iZXIuZ2V0Q291bnRyeUNvZGUoKVxyXG4gICAgICAgID8gdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmdldENvdW50cnlJc29Db2RlKG51bWJlci5nZXRDb3VudHJ5Q29kZSgpLCBudW1iZXIpXHJcbiAgICAgICAgOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xyXG4gICAgICBpZiAoY291bnRyeUNvZGUgJiYgY291bnRyeUNvZGUgIT09IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIpIHtcclxuICAgICAgICBjb25zdCBuZXdDb3VudHJ5ID0gdGhpcy5uZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLmFsbENvdW50cmllcy5maW5kKGMgPT4gYy5pc28yID09PSBjb3VudHJ5Q29kZSk7XHJcbiAgICAgICAgaWYgKG5ld0NvdW50cnkpIHtcclxuICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KG5ld0NvdW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZSA/IGNvdW50cnlDb2RlIDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcclxuXHJcbiAgICB0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW50bE5vID0gbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpIDogJyc7XHJcblxyXG4gICAgICAvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXHJcbiAgICAgIGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgaW50bE5vKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IHRoaXMucmVtb3ZlRGlhbENvZGUoaW50bE5vKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2Uoe1xyXG4gICAgICAgIG51bWJlcjogdGhpcy52YWx1ZSxcclxuICAgICAgICBpbnRlcm5hdGlvbmFsTnVtYmVyOiBpbnRsTm8sXHJcbiAgICAgICAgbmF0aW9uYWxOdW1iZXI6IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5OQVRJT05BTCkgOiAnJyxcclxuICAgICAgICBjb3VudHJ5Q29kZTogY291bnRyeUNvZGUudG9VcHBlckNhc2UoKSxcclxuICAgICAgICBkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGUsXHJcbiAgICAgICAgaWQ6IHRoaXMuaWRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNvdW50cnlTZWxlY3QoY291bnRyeTogQ291bnRyeSwgZWw/OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLm5neERyb3Bkb3duU2VydmljZS5jbG9zZSgpO1xyXG4gICAgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkoY291bnRyeSk7XHJcbiAgICB0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcclxuXHJcbiAgICBsZXQgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXI7XHJcbiAgICB0cnkge1xyXG4gICAgICBudW1iZXIgPSB0aGlzLnBob25lVXRpbC5wYXJzZSh0aGlzLnBob25lTnVtYmVyLCB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJlcGxhY2VEaWFsQ29kZSkge1xyXG4gICAgICB0aGlzLnBob25lTnVtYmVyID0gdGhpcy5fcmVwbGFjZURpYWxDb2RlKG51bWJlciwgY291bnRyeS5kaWFsQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW50bE5vID0gbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpIDogYGA7XHJcblxyXG4gICAgLy8gcGFyc2UgcGhvbmVOdW1iZXIgaWYgc2VwYXJhdGUgZGlhbCBjb2RlIGlzIG5lZWRlZFxyXG4gICAgaWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBpbnRsTm8pIHtcclxuICAgICAgdGhpcy5waG9uZU51bWJlciA9IHRoaXMucmVtb3ZlRGlhbENvZGUoaW50bE5vKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XHJcbiAgICAgIG51bWJlcjogdGhpcy52YWx1ZSxcclxuICAgICAgaW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxyXG4gICAgICBuYXRpb25hbE51bWJlcjogbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0Lk5BVElPTkFMKSA6ICcnLFxyXG4gICAgICBjb3VudHJ5Q29kZTogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICBkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGUsXHJcbiAgICAgIGlkOiB0aGlzLmlkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZWwpIHtcclxuICAgICAgZWwuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZURpYWxDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBwaG9uZU51bWJlcikge1xyXG4gICAgICBwaG9uZU51bWJlciA9IHBob25lTnVtYmVyLnN1YnN0cmluZyhwaG9uZU51bWJlci5pbmRleE9mKCcgJykgKyAxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaG9uZU51bWJlcjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlcGxhY2VEaWFsQ29kZShwaG9uZU51bWJlcjogbHBuLlBob25lTnVtYmVyLCBuZXdDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZGlhbENvZGUgPSBOdW1iZXIobmV3Q29kZSk7XHJcbiAgICBpZiAoIXBob25lTnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiBgKyR7bmV3Q29kZX1gO1xyXG4gICAgfVxyXG4gICAgcGhvbmVOdW1iZXIuc2V0Q291bnRyeUNvZGUoZGlhbENvZGUpO1xyXG4gICAgcmV0dXJuIHRoaXMucGhvbmVVdGlsLmZvcm1hdChwaG9uZU51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0LkUxNjQpO1xyXG4gIH1cclxuXHJcbiAgLy8gYWRqdXN0IGlucHV0IGFsaWdubWVudFxyXG4gIHByaXZhdGUgY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKSB7XHJcbiAgICBpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XHJcbiAgICAgIGNvbnN0IGNvdW50cnlDb2RlID0gdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGU7XHJcbiAgICAgIHRoaXMuc2VwYXJhdGVEaWFsQ29kZUNsYXNzID0gJ3NlcGFyYXRlLWRpYWwtY29kZSBpdGktc2RjLScgKyAoY291bnRyeUNvZGUubGVuZ3RoICsgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlcGFyYXRlRGlhbENvZGVDbGFzcyA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXBwbHlEaWFsQ29kZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5waG9uZU51bWJlcikge1xyXG4gICAgICB0aGlzLnBob25lTnVtYmVyID0gYCske3RoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlfWA7XHJcbiAgICAgIHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25CbHVyRXZlbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgdGhpcy5vbkJsdXIuZW1pdCgpO1xyXG4gICAgdGhpcy5pc0ZvY3VzZWQgPSAhdGhpcy5pc0ZvY3VzZWQ7XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzRXZlbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uRm9jdXMuZW1pdCgpO1xyXG4gICAgdGhpcy5pc0ZvY3VzZWQgPSAhdGhpcy5pc0ZvY3VzZWQ7XHJcbiAgICBpZiAodGhpcy5hcHBseUNvZGVPbkZvY3VzKSB7XHJcbiAgICAgIHRoaXMuX2FwcGx5RGlhbENvZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTWVudU9wZW4oKTogdm9pZCB7XHJcbiAgICB0aGlzLm1lbnVPcGVuZWQuZW1pdCgpO1xyXG4gICAgdGhpcy5zZWFyY2hCdWZmZXIgPSAnJztcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkQ291bnRyeSkge1xyXG4gICAgICB0aGlzLm5neERyb3Bkb3duU2VydmljZS5zY3JvbGxUb0NvdW50cnkodGhpcy5zZWxlY3RlZENvdW50cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNZW51Q2xvc2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1lbnVDbG9zZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgb3BlbkRyb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ3hEcm9wZG93blNlcnZpY2Uub3BlbkZyb21UZW1wbGF0ZSh0aGlzLmRyb3Bkb3duVGVtcGxhdGUsIHRoaXMuY29ubmVjdGVkRWxlbWVudCwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcclxuICAgIHRoaXMuaXNNZW51T3BlbigpO1xyXG4gIH1cclxuXHJcbiAgb25DbGVhckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLnBob25lTnVtYmVyID0gJyc7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShudWxsKTtcclxuICAgIHRoaXMuY2xlYXIuZW1pdCgpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibmd4LWludGwtdGVsXCJcclxuICAgICBbY2xhc3Mubmd4LWludGwtdGVsX3N0cm9rZWRdPVwic3Ryb2tlZFwiXHJcbiAgICAgW2NsYXNzLm5neC1pbnRsLXRlbF9lcnJvcl09XCJpbnZhbGlkICYmIChkaXJ0eUFuZFRvdWNoZWQgfHwgKG5neEludGxUZWxGb3JtLnN1Ym1pdHRlZCQgfCBhc3luYykpXCJcclxuICAgICBbY2xhc3Mubmd4LWludGwtdGVsX29wZW5lZF09XCJuZ3hEcm9wZG93blNlcnZpY2UubWVudVN0YXRlJCB8IGFzeW5jXCJcclxuICAgICBbY2xhc3Mubmd4LWludGwtdGVsX2ZvY3VzXT1cImlzRm9jdXNlZFwiPlxyXG4gICAgPG5neC1pbnRsLXRlbC10cmlnZ2VyICpuZ0lmPVwiIWRpc2FibGVDb3VudHJ5U2VsZWN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5neC1pbnRsLXRlbF9fdHJpZ2dlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm5neC1pbnRsLXRlbF9fdHJpZ2dlcl9zbWFsbF09XCJzbWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgI2Nvbm5lY3RlZEVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbY291bnRyeV09XCJzZWxlY3RlZENvdW50cnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtpc0Vycm9yXT1cImludmFsaWQgJiYgKGRpcnR5QW5kVG91Y2hlZCB8fCAobmd4SW50bFRlbEZvcm0uc3VibWl0dGVkJCB8IGFzeW5jKSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtpc01lbnVPcGVuZWRdPVwibmd4RHJvcGRvd25TZXJ2aWNlLm1lbnVTdGF0ZSQgfCBhc3luY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBGaWVsZF09XCJ0b29sdGlwRmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHJva2VkXT1cInN0cm9rZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvcGVuRHJvcGRvd24oKVwiPlxyXG4gICAgPC9uZ3gtaW50bC10ZWwtdHJpZ2dlcj5cclxuICAgIDxtYXQtZm9ybS1maWVsZCBbZmxvYXRMYWJlbF09XCJmbG9hdExhYmVsXCJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5neC1pbnRsLXRlbF9fZm9ybS1maWVsZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm5neC1pbnRsLXRlbF9fZm9ybS1maWVsZF9zbWFsbF09XCJzbWFsbFwiPlxyXG4gICAgICAgIDxtYXQtbGFiZWwgY2xhc3M9XCJuZ3gtaW50bC10ZWxfX2xhYmVsXCI+XHJcbiAgICAgICAgICAgIHt7IGlucHV0TGFiZWwgfX1cclxuICAgICAgICA8L21hdC1sYWJlbD5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJuZ3gtaW50bC10ZWxfX2lucHV0XCJcclxuICAgICAgICAgICAgICAgI2ZvY3VzYWJsZVxyXG4gICAgICAgICAgICAgICBtYXRJbnB1dFxyXG4gICAgICAgICAgICAgICB0eXBlPVwidGVsXCJcclxuICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcclxuICAgICAgICAgICAgICAgW2lkXT1cImlkXCJcclxuICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiY3NzQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicmVtb3ZlRGlhbENvZGUoc2VsZWN0ZWRDb3VudHJ5Py5wbGFjZUhvbGRlciB8fCAnJylcIlxyXG4gICAgICAgICAgICAgICBbYXR0ci5tYXhMZW5ndGhdPVwibWF4TGVuZ3RoXCJcclxuICAgICAgICAgICAgICAgW2F0dHIudmFsaWRhdGlvbl09XCJwaG9uZVZhbGlkYXRpb25cIlxyXG4gICAgICAgICAgICAgICBbZXJyb3JTdGF0ZU1hdGNoZXJdPVwiZXJyb3JTdGF0ZU1hdGNoZXJcIlxyXG4gICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInBob25lTnVtYmVyXCJcclxuICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25QaG9uZU51bWJlckNoYW5nZSgpXCJcclxuICAgICAgICAgICAgICAgKGJsdXIpPVwib25CbHVyRXZlbnQoKVwiXHJcbiAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzRXZlbnQoKVwiXHJcbiAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm5neEludGxUZWxJbnB1dFNlcnZpY2Uub25JbnB1dEtleVByZXNzKCRldmVudClcIj5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2xlYXJJY29uXCJcclxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICAgICAgICAgICAgbWF0U3VmZml4XHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGVhckNsaWNrKCRldmVudClcIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uPnt7IGNsZWFySWNvbiB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cIm1hdEVycm9yQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCAmJiBoYXNFcnJvclwiPlxyXG4gICAgICAgICAgICB7eyAoZXJyb3JzICYmIGVycm9yc1tlcnJvcktleV0pIHx8IGNvbnRyb2wuZ2V0RXJyb3IoZXJyb3JLZXkpIH19XHJcbiAgICAgICAgPC9tYXQtZXJyb3I+XHJcbiAgICAgICAgPGRpdiAjbWF0RXJyb3JDb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1lcnJvclwiPjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICA8bmctdGVtcGxhdGUgI2Ryb3Bkb3duVGVtcGxhdGU+XHJcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwiZHJvcGRvd25DbGFzc1wiPlxyXG4gICAgICAgICAgICA8bmd4LWludGwtdGVsLWNvdW50cnkgW2NvdW50cmllc109XCJwcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkcm9wZG93blBhcmFtc109XCJkcm9wZG93blBhcmFtc0RhdGFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0cm9rZWRdPVwic3Ryb2tlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY291bnRyeUNsaWNrKT1cIm9uQ291bnRyeVNlbGVjdCgkZXZlbnQsIGZvY3VzYWJsZSlcIj5cclxuICAgICAgICAgICAgPC9uZ3gtaW50bC10ZWwtY291bnRyeT5cclxuICAgICAgICAgICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwicHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bj8ubGVuZ3RoXCI+PC9tYXQtZGl2aWRlcj5cclxuICAgICAgICAgICAgPG5neC1pbnRsLXRlbC1jb3VudHJ5IFtjb3VudHJpZXNdPVwibmd4SW50bFRlbElucHV0U2VydmljZS5hbGxDb3VudHJpZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Ryb3Bkb3duUGFyYW1zXT1cImRyb3Bkb3duUGFyYW1zRGF0YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3Ryb2tlZF09XCJzdHJva2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb3VudHJ5Q2xpY2spPVwib25Db3VudHJ5U2VsZWN0KCRldmVudCwgZm9jdXNhYmxlKVwiPlxyXG4gICAgICAgICAgICA8L25neC1pbnRsLXRlbC1jb3VudHJ5PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuPC9kaXY+XHJcbiJdfQ==