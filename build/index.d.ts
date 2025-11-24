import * as lpn from 'google-libphonenumber';
import * as i0 from '@angular/core';
import { TemplateRef, ElementRef, ViewContainerRef, OnInit, OnChanges, AfterViewInit, EventEmitter, ChangeDetectorRef, Injector, SimpleChanges, ModuleWithProviders } from '@angular/core';
import { Observable } from 'rxjs';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import * as i3$1 from '@angular/forms';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as i4$1 from '@angular/material/form-field';
import { FloatLabelType } from '@angular/material/form-field';
import * as i3 from '@angular/common';
import * as i5$1 from '@angular/material/input';
import * as i6$1 from '@angular/material/button';
import * as i7 from '@angular/material/select';
import * as i5 from '@angular/material/menu';
import * as i9 from '@angular/material/divider';
import * as i4 from '@angular/material/icon';
import * as i6 from '@angular/material/tooltip';
import * as i11 from '@angular/cdk/scrolling';

declare class CountryCode {
    allCountries: ((string | number | string[])[] | (string | number | number[])[])[];
}

interface Country {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    areaCodes?: string[];
    flagClass: string;
    placeHolder: string;
}

declare enum SearchCountryField {
    DialCode = "dialCode",
    Iso2 = "iso2",
    Name = "name",
    All = "all"
}

declare class NgxIntlTelInputService {
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

declare class NgxIntlTelFormService {
    private readonly _submitted$;
    readonly submitted$: Observable<boolean>;
    submit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxIntlTelFormService>;
}

interface IntlTelModel {
    number: string;
    internationalNumber: string;
    nationalNumber: string;
    countryCode: string;
    dialCode: string;
    id: string;
}

declare abstract class NgxIntlTelModelAdapter<T> {
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

declare class NgxDropdownService {
    private readonly overlay;
    private _overlayRef;
    private readonly _onMenuClose;
    readonly onMenuClose: Observable<void>;
    private readonly _menuState$;
    readonly menuState$: Observable<boolean>;
    constructor(overlay: Overlay);
    openFromTemplate<T>(template: TemplateRef<T>, connectedElementRef: ElementRef, viewContainerRef: ViewContainerRef, configOptions?: OverlayConfig): void;
    private _createPosition;
    private _createConfig;
    close(): void;
    scrollToCountry(country: Country): void;
    getMenuState(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDropdownService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxDropdownService>;
}

declare enum CountryDropdownDisplayOptions {
    Flag = 0,
    Name = 1,
    Dial = 2
}

declare enum CountryISO {
    Afghanistan = "af",
    Albania = "al",
    Algeria = "dz",
    AmericanSamoa = "as",
    Andorra = "ad",
    Angola = "ao",
    Anguilla = "ai",
    AntiguaAndBarbuda = "ag",
    Argentina = "ar",
    Armenia = "am",
    Aruba = "aw",
    Australia = "au",
    Austria = "at",
    Azerbaijan = "az",
    Bahamas = "bs",
    Bahrain = "bh",
    Bangladesh = "bd",
    Barbados = "bb",
    Belarus = "by",
    Belgium = "be",
    Belize = "bz",
    Benin = "bj",
    Bermuda = "bm",
    Bhutan = "bt",
    Bolivia = "bo",
    BosniaAndHerzegovina = "ba",
    Botswana = "bw",
    Brazil = "br",
    BritishIndianOceanTerritory = "io",
    BritishVirginIslands = "vg",
    Brunei = "bn",
    Bulgaria = "bg",
    BurkinaFaso = "bf",
    Burundi = "bi",
    Cambodia = "kh",
    Cameroon = "cm",
    Canada = "ca",
    CapeVerde = "cv",
    CaribbeanNetherlands = "bq",
    CaymanIslands = "ky",
    CentralAfricanRepublic = "cf",
    Chad = "td",
    Chile = "cl",
    China = "cn",
    ChristmasIsland = "cx",
    Cocos = "cc",
    Colombia = "co",
    Comoros = "km",
    CongoDRCJamhuriYaKidemokrasiaYaKongo = "cd",
    CongoRepublicCongoBrazzaville = "cg",
    CookIslands = "ck",
    CostaRica = "cr",
    CôteDIvoire = "ci",
    Croatia = "hr",
    Cuba = "cu",
    Curaçao = "cw",
    Cyprus = "cy",
    CzechRepublic = "cz",
    Denmark = "dk",
    Djibouti = "dj",
    Dominica = "dm",
    DominicanRepublic = "do",
    Ecuador = "ec",
    Egypt = "eg",
    ElSalvador = "sv",
    EquatorialGuinea = "gq",
    Eritrea = "er",
    Estonia = "ee",
    Ethiopia = "et",
    FalklandIslands = "fk",
    FaroeIslands = "fo",
    Fiji = "fj",
    Finland = "fi",
    France = "fr",
    FrenchGuiana = "gf",
    FrenchPolynesia = "pf",
    Gabon = "ga",
    Gambia = "gm",
    Georgia = "ge",
    Germany = "de",
    Ghana = "gh",
    Gibraltar = "gi",
    Greece = "gr",
    Greenland = "gl",
    Grenada = "gd",
    Guadeloupe = "gp",
    Guam = "gu",
    Guatemala = "gt",
    Guernsey = "gg",
    Guinea = "gn",
    GuineaBissau = "gw",
    Guyana = "gy",
    Haiti = "ht",
    Honduras = "hn",
    HongKong = "hk",
    Hungary = "hu",
    Iceland = "is",
    India = "in",
    Indonesia = "id",
    Iran = "ir",
    Iraq = "iq",
    Ireland = "ie",
    IsleOfMan = "im",
    Israel = "il",
    Italy = "it",
    Jamaica = "jm",
    Japan = "jp",
    Jersey = "je",
    Jordan = "jo",
    Kazakhstan = "kz",
    Kenya = "ke",
    Kiribati = "ki",
    Kosovo = "xk",
    Kuwait = "kw",
    Kyrgyzstan = "kg",
    Laos = "la",
    Latvia = "lv",
    Lebanon = "lb",
    Lesotho = "ls",
    Liberia = "lr",
    Libya = "ly",
    Liechtenstein = "li",
    Lithuania = "lt",
    Luxembourg = "lu",
    Macau = "mo",
    Macedonia = "mk",
    Madagascar = "mg",
    Malawi = "mw",
    Malaysia = "my",
    Maldives = "mv",
    Mali = "ml",
    Malta = "mt",
    MarshallIslands = "mh",
    Martinique = "mq",
    Mauritania = "mr",
    Mauritius = "mu",
    Mayotte = "yt",
    Mexico = "mx",
    Micronesia = "fm",
    Moldova = "md",
    Monaco = "mc",
    Mongolia = "mn",
    Montenegro = "me",
    Montserrat = "ms",
    Morocco = "ma",
    Mozambique = "mz",
    Myanmar = "mm",
    Namibia = "na",
    Nauru = "nr",
    Nepal = "np",
    Netherlands = "nl",
    NewCaledonia = "nc",
    NewZealand = "nz",
    Nicaragua = "ni",
    Niger = "ne",
    Nigeria = "ng",
    Niue = "nu",
    NorfolkIsland = "nf",
    NorthKorea = "kp",
    NorthernMarianaIslands = "mp",
    Norway = "no",
    Oman = "om",
    Pakistan = "pk",
    Palau = "pw",
    Palestine = "ps",
    Panama = "pa",
    PapuaNewGuinea = "pg",
    Paraguay = "py",
    Peru = "pe",
    Philippines = "ph",
    Poland = "pl",
    Portugal = "pt",
    PuertoRico = "pr",
    Qatar = "qa",
    Réunion = "re",
    Romania = "ro",
    Russia = "ru",
    Rwanda = "rw",
    SaintBarthélemy = "bl",
    SaintHelena = "sh",
    SaintKittsAndNevis = "kn",
    SaintLucia = "lc",
    SaintMartin = "mf",
    SaintPierreAndMiquelon = "pm",
    SaintVincentAndTheGrenadines = "vc",
    Samoa = "ws",
    SanMarino = "sm",
    SãoToméAndPríncipe = "st",
    SaudiArabia = "sa",
    Senegal = "sn",
    Serbia = "rs",
    Seychelles = "sc",
    SierraLeone = "sl",
    Singapore = "sg",
    SintMaarten = "sx",
    Slovakia = "sk",
    Slovenia = "si",
    SolomonIslands = "sb",
    Somalia = "so",
    SouthAfrica = "za",
    SouthKorea = "kr",
    SouthSudan = "ss",
    Spain = "es",
    SriLanka = "lk",
    Sudan = "sd",
    Suriname = "sr",
    SvalbardAndJanMayen = "sj",
    Swaziland = "sz",
    Sweden = "se",
    Switzerland = "ch",
    Syria = "sy",
    Taiwan = "tw",
    Tajikistan = "tj",
    Tanzania = "tz",
    Thailand = "th",
    TimorLeste = "tl",
    Togo = "tg",
    Tokelau = "tk",
    Tonga = "to",
    TrinidadAndTobago = "tt",
    Tunisia = "tn",
    Turkey = "tr",
    Turkmenistan = "tm",
    TurksAndCaicosIslands = "tc",
    Tuvalu = "tv",
    USVirginIslands = "vi",
    Uganda = "ug",
    Ukraine = "ua",
    UnitedArabEmirates = "ae",
    UnitedKingdom = "gb",
    UnitedStates = "us",
    Uruguay = "uy",
    Uzbekistan = "uz",
    Vanuatu = "vu",
    VaticanCity = "va",
    Venezuela = "ve",
    Vietnam = "vn",
    WallisAndFutuna = "wf",
    WesternSahara = "eh",
    Yemen = "ye",
    Zambia = "zm",
    Zimbabwe = "zw",
    ÅlandIslands = "ax"
}

declare enum TooltipLabel {
    Name = "name",
    Iso2 = "iso2"
}

interface INgxIntlTelInputComponent {
    phoneValidation: boolean;
}

declare class NgxIntlTelInputComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor, INgxIntlTelInputComponent {
    readonly ngxIntlTelInputService: NgxIntlTelInputService;
    readonly ngxIntlTelForm: NgxIntlTelFormService;
    readonly ngxDropdownService: NgxDropdownService;
    private readonly ngxIntlTelModelAdapter;
    private readonly viewContainerRef;
    private readonly changeDetector;
    private injector;
    onKeyPress($event: KeyboardEvent): void;
    dropdownTemplate: TemplateRef<HTMLDivElement>;
    connectedElement: ElementRef<HTMLDivElement>;
    value: string;
    small: boolean;
    preferredCountries: string[];
    enablePlaceholder: boolean;
    cssClass: string;
    onlyCountries: string[];
    id: string;
    enableAutoCountrySelect: boolean;
    maxLength: number | string;
    tooltipField: TooltipLabel;
    selectFirstCountry: boolean;
    selectedCountryISO: CountryISO;
    phoneValidation: boolean;
    floatLabel: FloatLabelType;
    inputLabel: string;
    separateDialCode: boolean;
    replaceDialCode: boolean;
    stroked: boolean;
    isFocused: boolean;
    applyCodeOnFocus: boolean;
    disableCountrySelect: boolean;
    set dropdownClass(panelClass: string | string[]);
    set dropdownParams(params: CountryDropdownDisplayOptions[]);
    errors: Record<string, string>;
    set clearable(icon: string);
    countryChange: EventEmitter<Country>;
    onBlur: EventEmitter<void>;
    onFocus: EventEmitter<boolean>;
    menuClosed: EventEmitter<boolean>;
    menuOpened: EventEmitter<boolean>;
    clear: EventEmitter<void>;
    get dropdownClass(): string | string[];
    get errorStateMatcher(): ErrorStateMatcher;
    get errorKey(): string;
    get hasError(): boolean;
    get invalid(): boolean;
    get dirtyAndTouched(): boolean;
    private readonly _dropdownPanelClass;
    selectedCountry: Country;
    searchBuffer: string;
    separateDialCodeClass: string;
    phoneNumber: string;
    preferredCountriesInDropDown: Array<Country>;
    phoneUtil: any;
    disabled: boolean;
    clearIcon: string;
    dropdownParamsData: CountryDropdownDisplayOptions[];
    onTouched: () => void;
    propagateChange: (model: IntlTelModel | null) => void;
    control: FormControl;
    constructor(ngxIntlTelInputService: NgxIntlTelInputService, ngxIntlTelForm: NgxIntlTelFormService, ngxDropdownService: NgxDropdownService, ngxIntlTelModelAdapter: NgxIntlTelModelAdapter<unknown>, viewContainerRef: ViewContainerRef, changeDetector: ChangeDetectorRef, injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: any): void;
    private _init;
    setSelectedCountry(country: Country): void;
    getSelectedCountry(): void;
    onPhoneNumberChange(): void;
    onCountrySelect(country: Country, el?: HTMLInputElement): void;
    removeDialCode(phoneNumber: string): string;
    private _replaceDialCode;
    private checkSeparateDialCodeStyle;
    private _applyDialCode;
    onBlurEvent(): void;
    onFocusEvent(): void;
    isMenuOpen(): void;
    isMenuClose(): void;
    openDropdown(): void;
    onClearClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxIntlTelInputComponent, "ngx-intl-tel-input", never, { "value": { "alias": "value"; "required": false; }; "small": { "alias": "small"; "required": false; }; "preferredCountries": { "alias": "preferredCountries"; "required": false; }; "enablePlaceholder": { "alias": "enablePlaceholder"; "required": false; }; "cssClass": { "alias": "cssClass"; "required": false; }; "onlyCountries": { "alias": "onlyCountries"; "required": false; }; "id": { "alias": "id"; "required": false; }; "enableAutoCountrySelect": { "alias": "enableAutoCountrySelect"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "tooltipField": { "alias": "tooltipField"; "required": false; }; "selectFirstCountry": { "alias": "selectFirstCountry"; "required": false; }; "selectedCountryISO": { "alias": "selectedCountryISO"; "required": false; }; "phoneValidation": { "alias": "phoneValidation"; "required": false; }; "floatLabel": { "alias": "floatLabel"; "required": false; }; "inputLabel": { "alias": "inputLabel"; "required": false; }; "separateDialCode": { "alias": "separateDialCode"; "required": false; }; "replaceDialCode": { "alias": "replaceDialCode"; "required": false; }; "stroked": { "alias": "stroked"; "required": false; }; "isFocused": { "alias": "isFocused"; "required": false; }; "applyCodeOnFocus": { "alias": "applyCodeOnFocus"; "required": false; }; "disableCountrySelect": { "alias": "disableCountrySelect"; "required": false; }; "dropdownClass": { "alias": "dropdownClass"; "required": false; }; "dropdownParams": { "alias": "dropdownParams"; "required": false; }; "errors": { "alias": "errors"; "required": false; }; "clearable": { "alias": "clearable"; "required": false; }; }, { "countryChange": "countryChange"; "onBlur": "onBlur"; "onFocus": "onFocus"; "menuClosed": "menuClosed"; "menuOpened": "menuOpened"; "clear": "clear"; }, never, ["mat-error"], false, never>;
}

declare class NgxIntlTelTriggerComponent {
    country: Country;
    showCode: boolean;
    stroked: boolean;
    tooltipField: TooltipLabel;
    isMenuOpened: boolean;
    isError: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelTriggerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxIntlTelTriggerComponent, "ngx-intl-tel-trigger", never, { "country": { "alias": "country"; "required": false; }; "showCode": { "alias": "showCode"; "required": false; }; "stroked": { "alias": "stroked"; "required": false; }; "tooltipField": { "alias": "tooltipField"; "required": false; }; "isMenuOpened": { "alias": "isMenuOpened"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NgxIntlTelCountryComponent {
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

declare class ComponentsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ComponentsModule, [typeof NgxIntlTelTriggerComponent, typeof NgxIntlTelCountryComponent], [typeof i3.CommonModule, typeof i4.MatIconModule, typeof i5.MatMenuModule, typeof i6.MatTooltipModule], [typeof NgxIntlTelTriggerComponent, typeof NgxIntlTelCountryComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ComponentsModule>;
}

declare class NgxIntlTelInputModule {
    static forRoot(): ModuleWithProviders<NgxIntlTelInputModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxIntlTelInputModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxIntlTelInputModule, [typeof NgxIntlTelInputComponent], [typeof i3.CommonModule, typeof i3$1.FormsModule, typeof i3$1.ReactiveFormsModule, typeof i4$1.MatFormFieldModule, typeof i5$1.MatInputModule, typeof i6$1.MatButtonModule, typeof i7.MatSelectModule, typeof i5.MatMenuModule, typeof i9.MatDividerModule, typeof ComponentsModule, typeof i11.ScrollingModule, typeof i4.MatIconModule], [typeof NgxIntlTelInputComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxIntlTelInputModule>;
}

interface CountryControl {
    number: string;
    internationalNumber: string;
    nationalNumber: string;
    countryCode: string;
    dialCode: string;
}

export { CountryDropdownDisplayOptions, CountryISO, NgxDropdownService, NgxIntlTelFormService, NgxIntlTelInputComponent, NgxIntlTelInputModule, NgxIntlTelInputService, NgxIntlTelModelAdapter, SearchCountryField, TooltipLabel };
export type { Country, CountryControl, IntlTelModel };
