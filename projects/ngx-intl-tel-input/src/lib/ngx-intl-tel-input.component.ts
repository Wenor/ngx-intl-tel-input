import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import * as lpn from 'google-libphonenumber';
import { CountryCode } from './data/country-code';
import { CountryDropdownDisplayOptions } from './enums/country-dropdown-display-options.enum';
import { CountryISO } from './enums/country-iso.enum';
import { SearchCountryField } from './enums/search-country-field.enum';
import { TooltipLabel } from './enums/tooltip-label.enum';
import { INgxIntlTelInputComponent } from './interfaces/ngx-intl-tel-input-component.interface';
import { Country } from './model/country.model';
import { IntlTelModel } from './model/intl-tel.model';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import { NgxDropdownService } from './services/ngx-dropdown.service';
import { NgxIntlTelFormService } from './services/ngx-intl-tel-form.service';
import { NgxIntlTelInputErrorMatcher } from './services/ngx-intl-tel-input-error-matcher';
import { NgxIntlTelInputService } from './services/ngx-intl-tel-input.service';
import { NgxIntlTelModelAdapter } from './services/ngx-intl-tel-model-adapter';

let ngxIntlTelInputId = 0;

@Component({
  selector: 'ngx-intl-tel-input',
  templateUrl: './ngx-intl-tel-input.component.html',
  styleUrls: ['./ngx-intl-tel-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
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
      useFactory: (ngxIntlTelInputComponent: INgxIntlTelInputComponent,
                   ngxIntlTelModelAdapter: NgxIntlTelModelAdapter<unknown>) => {
        return phoneNumberValidator(ngxIntlTelInputComponent, ngxIntlTelModelAdapter);
      },
      deps: [NgxIntlTelInputComponent, NgxIntlTelModelAdapter],
      multi: true,
    }
  ]
})
export class NgxIntlTelInputComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor, INgxIntlTelInputComponent {

  @HostListener('window:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent): void {
    if (/[\da-zA-Zа-яА-ЯіІїЇєЄ]/.test($event.key) && this.ngxDropdownService.getMenuState()) {
      this.searchBuffer = `${this.searchBuffer}${$event.key}`;
      const countries = this.ngxIntlTelInputService.searchCountry(this.searchBuffer, [SearchCountryField.All]);
      if (countries.length === 0) {
        this.searchBuffer = '';
      } else {
        this.ngxDropdownService.scrollToCountry(countries[0]);
      }
    }
  }

  @ViewChild('dropdownTemplate', {static: true})
  dropdownTemplate: TemplateRef<HTMLDivElement>;

  @ViewChild('connectedElement', {static: false, read: ElementRef})
  connectedElement: ElementRef<HTMLDivElement>;

  @Input()
  value: string = '';

  @Input()
  small: boolean = false;

  @Input()
  preferredCountries: string[] = [];

  @Input()
  enablePlaceholder: boolean = true;

  @Input()
  cssClass: string = 'form-control';

  @Input()
  onlyCountries: string[] = [];

  @Input()
  id: string = `ngx-intl-tel-input-id-${ngxIntlTelInputId++}`;

  @Input()
  enableAutoCountrySelect: boolean = true;

  @Input()
  maxLength: number | string = '';

  @Input()
  tooltipField: TooltipLabel;

  @Input()
  selectFirstCountry: boolean = true;

  @Input()
  selectedCountryISO: CountryISO;

  @Input()
  phoneValidation: boolean = true;

  @Input()
  floatLabel: FloatLabelType = 'always';

  @Input()
  inputLabel: string = 'Phone number';

  @Input()
  separateDialCode: boolean = false;

  @Input()
  replaceDialCode: boolean = true;

  @Input()
  stroked: boolean;

  @Input()
  isFocused: boolean = false;

  @Input()
  applyCodeOnFocus: boolean = true;

  @Input()
  disableCountrySelect: boolean = false;

  @Input()
  set dropdownClass(panelClass: string | string[]) {
    const classes = (typeof panelClass === 'string') ? [panelClass] : panelClass;
    this._dropdownPanelClass.push(...classes);
  }

  @Input()
  set dropdownParams(params: CountryDropdownDisplayOptions[]) {
    if (params && params.length !== 0) {
      this.dropdownParamsData = params;
    }
  }

  @Input()
  errors: Record<string, string>;

  @Input()
  set clearable(icon: string) {
    if (typeof icon === 'boolean') {
      return;
    }
    if (!icon) {
      this.clearIcon = 'close';
      return;
    }
    this.clearIcon = icon;
  }

  @Output()
  countryChange = new EventEmitter<Country>();

  @Output()
  onBlur = new EventEmitter<void>();

  @Output()
  onFocus = new EventEmitter<boolean>();

  @Output()
  menuClosed = new EventEmitter<boolean>();

  @Output()
  menuOpened = new EventEmitter<boolean>();

  @Output()
  clear = new EventEmitter<void>();

  get dropdownClass(): string | string[] {
    return [
      ...this._dropdownPanelClass,
      ...(this.stroked ? ['ngx-intl-tel__dropdown-stroked'] : ['ngx-intl-tel__dropdown'])
    ].join(' ');
  }

  get errorStateMatcher(): ErrorStateMatcher {
    return new NgxIntlTelInputErrorMatcher(this.control);
  }

  get errorKey(): string {
    const keys = this.control.errors && Object.keys(this.control.errors);
    return keys && keys.length !== 0 ? keys[0] : '';
  }

  get hasError(): boolean {
    if (!this.control) {
      return false;
    }
    return this.control.hasError(this.errorKey);
  }

  get invalid(): boolean {
    return this.control && this.control.invalid;
  }

  get dirtyAndTouched(): boolean {
    return this.control.dirty && this.control.touched;
  }

  private readonly _dropdownPanelClass: string[] = [];

  selectedCountry: Country = {
    areaCodes: undefined,
    dialCode: '',
    flagClass: '',
    iso2: '',
    name: '',
    placeHolder: '',
    priority: 0
  };

  searchBuffer: string = '';

  separateDialCodeClass: string;

  phoneNumber = '';

  preferredCountriesInDropDown: Array<Country> = [];
  // Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
  phoneUtil: any = lpn.PhoneNumberUtil.getInstance();

  disabled = false;

  clearIcon: string = null;

  dropdownParamsData: CountryDropdownDisplayOptions[] = [
    CountryDropdownDisplayOptions.Dial,
    CountryDropdownDisplayOptions.Flag,
    CountryDropdownDisplayOptions.Name
  ];

  onTouched = () => {};

  propagateChange = (model: IntlTelModel | null) => {};

  control: FormControl;

  constructor(public readonly ngxIntlTelInputService: NgxIntlTelInputService,
              public readonly ngxIntlTelForm: NgxIntlTelFormService,
              public readonly ngxDropdownService: NgxDropdownService,
              private readonly ngxIntlTelModelAdapter: NgxIntlTelModelAdapter<unknown>,
              private readonly viewContainerRef: ViewContainerRef,
              private readonly changeDetector: ChangeDetectorRef,
              private injector: Injector) {
  }

  ngOnInit() {
    this._init();
    this.ngxDropdownService.onMenuClose.subscribe(() => this.isMenuClose());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.ngxIntlTelInputService.allCountries && changes['selectedCountryISO']
      && changes['selectedCountryISO'].currentValue !== changes['selectedCountryISO'].previousValue) {
      this.getSelectedCountry();
    }
    if (changes.preferredCountries) {
      this.preferredCountriesInDropDown = this.ngxIntlTelInputService.getPreferredCountries(this.preferredCountries);
    }
    this.checkSeparateDialCodeStyle();
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
      });
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = (model) => {
      fn(this.ngxIntlTelModelAdapter.libPhoneNumberModelToControlValue(model));
    };
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.phoneNumber = this.ngxIntlTelModelAdapter.controlValueToString(obj);
  }

  private _init(): void {
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
      } else {
        this.setSelectedCountry(this.ngxIntlTelInputService.allCountries[0]);
      }
    }
    this.getSelectedCountry();
    this.checkSeparateDialCodeStyle();
    this.onCountrySelect(this.selectedCountry);
  }

  setSelectedCountry(country: Country): void {
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
        } else {
          this.propagateChange(null);
        }
      }
    }
  }

  onPhoneNumberChange(): void {
    this.value = this.phoneNumber;

    let number: lpn.PhoneNumber;
    try {
      number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
    } catch (e) {
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
    } else {
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

  onCountrySelect(country: Country, el?: HTMLInputElement): void {
    this.ngxDropdownService.close();
    this.setSelectedCountry(country);
    this.checkSeparateDialCodeStyle();
    this.value = this.phoneNumber;

    let number: lpn.PhoneNumber;
    try {
      number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
    } catch (e) {
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

  removeDialCode(phoneNumber: string): string {
    if (this.separateDialCode && phoneNumber) {
      phoneNumber = phoneNumber.substring(phoneNumber.indexOf(' ') + 1);
    }
    return phoneNumber;
  }

  private _replaceDialCode(phoneNumber: lpn.PhoneNumber, newCode: string): string {
    const dialCode = Number(newCode);
    if (!phoneNumber) {
      return `+${newCode}`;
    }
    phoneNumber.setCountryCode(dialCode);
    return this.phoneUtil.format(phoneNumber, lpn.PhoneNumberFormat.E164);
  }

  // adjust input alignment
  private checkSeparateDialCodeStyle() {
    if (this.separateDialCode && this.selectedCountry) {
      const countryCode = this.selectedCountry.dialCode;
      this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (countryCode.length + 1);
    } else {
      this.separateDialCodeClass = '';
    }
  }

  private _applyDialCode(): void {
    if (!this.phoneNumber) {
      this.phoneNumber = `+${this.selectedCountry.dialCode}`;
      this.onPhoneNumberChange();
    }
  }

  onBlurEvent(): void {
    this.onTouched();
    this.onBlur.emit();
    this.isFocused = !this.isFocused;
  }

  onFocusEvent(): void {
    this.onFocus.emit();
    this.isFocused = !this.isFocused;
    if (this.applyCodeOnFocus) {
      this._applyDialCode();
    }
  }

  isMenuOpen(): void {
    this.menuOpened.emit();
    this.searchBuffer = '';
    if (this.selectedCountry) {
      this.ngxDropdownService.scrollToCountry(this.selectedCountry);
    }
  }

  isMenuClose(): void {
    this.menuClosed.emit();
  }

  openDropdown(): void {
    this.ngxDropdownService.openFromTemplate(this.dropdownTemplate, this.connectedElement, this.viewContainerRef);
    this.isMenuOpen();
  }

  onClearClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.phoneNumber = '';
    this.propagateChange(null);
    this.clear.emit();
  }
}
