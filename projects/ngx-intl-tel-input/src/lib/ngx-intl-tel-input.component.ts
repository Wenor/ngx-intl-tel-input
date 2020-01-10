import {
  Component, ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CountryCode} from './data/country-code';
import {phoneNumberValidator} from './ngx-intl-tel-input.validator';
import {Country} from './model/country.model';
import * as lpn from 'google-libphonenumber';
import {TooltipLabel} from './enums/tooltip-label.enum';
import {CountryISO} from './enums/country-iso.enum';
import {FloatLabelType} from '@angular/material/core';
import {CountryDropdownDisplayOptions} from './enums/country-dropdown-display-options.enum';
import {NgxIntlTelInputService} from './services/ngx-intl-tel-input.service';
import {SearchCountryField} from './enums/search-country-field.enum';
import {NgxDropdownService} from './services/ngx-dropdown.service';

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
      useValue: phoneNumberValidator,
      multi: true,
    }
  ]
})
export class NgxIntlTelInputComponent implements OnInit, OnChanges {

  @HostListener('window:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent): void {
    console.log('aaaa');
    if (/[0-9a-zA-Zа-яА-ЯіІїЇєЄ]/.test($event.key) && this.isMenuOpened) {
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

  @ViewChild('connectedElement', {static: true, read: ElementRef})
  connectedElement: ElementRef<HTMLDivElement>;

  @Input()
  value = '';

  @Input()
  preferredCountries: string[] = [];

  @Input()
  enablePlaceholder = true;

  @Input()
  cssClass = 'form-control';

  @Input()
  onlyCountries: string[] = [];

  @Input()
  enableAutoCountrySelect = true;

  @Input()
  maxLength = '';

  @Input()
  tooltipField: TooltipLabel;

  @Input()
  selectFirstCountry = true;

  @Input()
  selectedCountryISO: CountryISO;

  @Input()
  phoneValidation = true;

  @Input()
  floatLabel: FloatLabelType = 'always';

  @Input()
  inputLabel: string = 'Phone number';

  @Input()
  separateDialCode = false;

  @Input()
  replaceDialCode = true;

  @Input()
  stroked: boolean;

  @Input()
  isMenuOpened: boolean;

  @Input()
  isFocused: boolean = false;

  @Input()
  isError: boolean;

  @Input()
  applyCodeOnFocus: boolean = true;

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

  get dropdownClass(): string | string[] {
    return this._dropdownPanelClass.join(' ');
  }

  private readonly _dropdownPanelClass: string[] = this.stroked ? ['ngx-intl-tel__dropdown'] : ['ngx-intl-tel__dropdown-stroked'];

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

  dropdownParamsData: CountryDropdownDisplayOptions[] = [
    CountryDropdownDisplayOptions.Dial,
    CountryDropdownDisplayOptions.Flag,
    CountryDropdownDisplayOptions.Name
  ];

  onTouched = () => {};

  propagateChange = (_: any) => {};

  constructor(public readonly ngxIntlTelInputService: NgxIntlTelInputService,
              private readonly ngxDropdownService: NgxDropdownService,
              private readonly viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.init();

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

  private init(): void {
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
          this.propagateChange(undefined);
        }
      }
    }
  }

  public onPhoneNumberChange(): void {
    this.value = this.phoneNumber;

    let number: lpn.PhoneNumber;
    try {
      number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
    } catch (e) {
    }

    let countryCode = this.selectedCountry.iso2;
    // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
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
        dialCode: '+' + this.selectedCountry.dialCode
      });
    }
  }

  public onCountrySelect(country: Country, el?: HTMLInputElement): void {
    this.ngxDropdownService.close();
    this.setSelectedCountry(country);
    this.checkSeparateDialCodeStyle();
    this.value = this.phoneNumber;

    let number: lpn.PhoneNumber;
    try {
      number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
    } catch (e) {}

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
      dialCode: '+' + this.selectedCountry.dialCode
    });

    if (el) {
      el.focus();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj == null) {
      this.init();
    }
    this.phoneNumber = obj;
    setTimeout(() => {
      this.onPhoneNumberChange();
    }, 1);
  }

  removeDialCode(phoneNumber: string): string {
    if (this.separateDialCode && phoneNumber) {
      phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
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
    this.isMenuOpened = true;
    if (this.selectedCountry) {
      this.ngxDropdownService.scrollToCountry(this.selectedCountry);
    }
  }

  isMenuClose(): void {
    this.isMenuOpened = false;
    this.menuClosed.emit();
  }

  openDropdown(): void {
    this.ngxDropdownService.openFromTemplate(this.dropdownTemplate, this.connectedElement, this.viewContainerRef);
    this.isMenuOpen();
  }
}
