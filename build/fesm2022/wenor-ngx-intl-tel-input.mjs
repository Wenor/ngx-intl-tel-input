import * as i0 from '@angular/core';
import { Injectable, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, EventEmitter, Output, forwardRef, ElementRef, HostListener, ViewChild, NgModule } from '@angular/core';
import * as lpn from 'google-libphonenumber';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i1 from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i6 from '@angular/forms';
import { NgControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i7 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i8 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i9 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i10 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

// noinspection NonAsciiCharacters,JSNonASCIINames
var CountryISO;
(function (CountryISO) {
    CountryISO["Afghanistan"] = "af";
    CountryISO["Albania"] = "al";
    CountryISO["Algeria"] = "dz";
    CountryISO["AmericanSamoa"] = "as";
    CountryISO["Andorra"] = "ad";
    CountryISO["Angola"] = "ao";
    CountryISO["Anguilla"] = "ai";
    CountryISO["AntiguaAndBarbuda"] = "ag";
    CountryISO["Argentina"] = "ar";
    CountryISO["Armenia"] = "am";
    CountryISO["Aruba"] = "aw";
    CountryISO["Australia"] = "au";
    CountryISO["Austria"] = "at";
    CountryISO["Azerbaijan"] = "az";
    CountryISO["Bahamas"] = "bs";
    CountryISO["Bahrain"] = "bh";
    CountryISO["Bangladesh"] = "bd";
    CountryISO["Barbados"] = "bb";
    CountryISO["Belarus"] = "by";
    CountryISO["Belgium"] = "be";
    CountryISO["Belize"] = "bz";
    CountryISO["Benin"] = "bj";
    CountryISO["Bermuda"] = "bm";
    CountryISO["Bhutan"] = "bt";
    CountryISO["Bolivia"] = "bo";
    CountryISO["BosniaAndHerzegovina"] = "ba";
    CountryISO["Botswana"] = "bw";
    CountryISO["Brazil"] = "br";
    CountryISO["BritishIndianOceanTerritory"] = "io";
    CountryISO["BritishVirginIslands"] = "vg";
    CountryISO["Brunei"] = "bn";
    CountryISO["Bulgaria"] = "bg";
    CountryISO["BurkinaFaso"] = "bf";
    CountryISO["Burundi"] = "bi";
    CountryISO["Cambodia"] = "kh";
    CountryISO["Cameroon"] = "cm";
    CountryISO["Canada"] = "ca";
    CountryISO["CapeVerde"] = "cv";
    CountryISO["CaribbeanNetherlands"] = "bq";
    CountryISO["CaymanIslands"] = "ky";
    CountryISO["CentralAfricanRepublic"] = "cf";
    CountryISO["Chad"] = "td";
    CountryISO["Chile"] = "cl";
    CountryISO["China"] = "cn";
    CountryISO["ChristmasIsland"] = "cx";
    CountryISO["Cocos"] = "cc";
    CountryISO["Colombia"] = "co";
    CountryISO["Comoros"] = "km";
    CountryISO["CongoDRCJamhuriYaKidemokrasiaYaKongo"] = "cd";
    CountryISO["CongoRepublicCongoBrazzaville"] = "cg";
    CountryISO["CookIslands"] = "ck";
    CountryISO["CostaRica"] = "cr";
    CountryISO["C\u00F4teDIvoire"] = "ci";
    CountryISO["Croatia"] = "hr";
    CountryISO["Cuba"] = "cu";
    CountryISO["Cura\u00E7ao"] = "cw";
    CountryISO["Cyprus"] = "cy";
    CountryISO["CzechRepublic"] = "cz";
    CountryISO["Denmark"] = "dk";
    CountryISO["Djibouti"] = "dj";
    CountryISO["Dominica"] = "dm";
    CountryISO["DominicanRepublic"] = "do";
    CountryISO["Ecuador"] = "ec";
    CountryISO["Egypt"] = "eg";
    CountryISO["ElSalvador"] = "sv";
    CountryISO["EquatorialGuinea"] = "gq";
    CountryISO["Eritrea"] = "er";
    CountryISO["Estonia"] = "ee";
    CountryISO["Ethiopia"] = "et";
    CountryISO["FalklandIslands"] = "fk";
    CountryISO["FaroeIslands"] = "fo";
    CountryISO["Fiji"] = "fj";
    CountryISO["Finland"] = "fi";
    CountryISO["France"] = "fr";
    CountryISO["FrenchGuiana"] = "gf";
    CountryISO["FrenchPolynesia"] = "pf";
    CountryISO["Gabon"] = "ga";
    CountryISO["Gambia"] = "gm";
    CountryISO["Georgia"] = "ge";
    CountryISO["Germany"] = "de";
    CountryISO["Ghana"] = "gh";
    CountryISO["Gibraltar"] = "gi";
    CountryISO["Greece"] = "gr";
    CountryISO["Greenland"] = "gl";
    CountryISO["Grenada"] = "gd";
    CountryISO["Guadeloupe"] = "gp";
    CountryISO["Guam"] = "gu";
    CountryISO["Guatemala"] = "gt";
    CountryISO["Guernsey"] = "gg";
    CountryISO["Guinea"] = "gn";
    CountryISO["GuineaBissau"] = "gw";
    CountryISO["Guyana"] = "gy";
    CountryISO["Haiti"] = "ht";
    CountryISO["Honduras"] = "hn";
    CountryISO["HongKong"] = "hk";
    CountryISO["Hungary"] = "hu";
    CountryISO["Iceland"] = "is";
    CountryISO["India"] = "in";
    CountryISO["Indonesia"] = "id";
    CountryISO["Iran"] = "ir";
    CountryISO["Iraq"] = "iq";
    CountryISO["Ireland"] = "ie";
    CountryISO["IsleOfMan"] = "im";
    CountryISO["Israel"] = "il";
    CountryISO["Italy"] = "it";
    CountryISO["Jamaica"] = "jm";
    CountryISO["Japan"] = "jp";
    CountryISO["Jersey"] = "je";
    CountryISO["Jordan"] = "jo";
    CountryISO["Kazakhstan"] = "kz";
    CountryISO["Kenya"] = "ke";
    CountryISO["Kiribati"] = "ki";
    CountryISO["Kosovo"] = "xk";
    CountryISO["Kuwait"] = "kw";
    CountryISO["Kyrgyzstan"] = "kg";
    CountryISO["Laos"] = "la";
    CountryISO["Latvia"] = "lv";
    CountryISO["Lebanon"] = "lb";
    CountryISO["Lesotho"] = "ls";
    CountryISO["Liberia"] = "lr";
    CountryISO["Libya"] = "ly";
    CountryISO["Liechtenstein"] = "li";
    CountryISO["Lithuania"] = "lt";
    CountryISO["Luxembourg"] = "lu";
    CountryISO["Macau"] = "mo";
    CountryISO["Macedonia"] = "mk";
    CountryISO["Madagascar"] = "mg";
    CountryISO["Malawi"] = "mw";
    CountryISO["Malaysia"] = "my";
    CountryISO["Maldives"] = "mv";
    CountryISO["Mali"] = "ml";
    CountryISO["Malta"] = "mt";
    CountryISO["MarshallIslands"] = "mh";
    CountryISO["Martinique"] = "mq";
    CountryISO["Mauritania"] = "mr";
    CountryISO["Mauritius"] = "mu";
    CountryISO["Mayotte"] = "yt";
    CountryISO["Mexico"] = "mx";
    CountryISO["Micronesia"] = "fm";
    CountryISO["Moldova"] = "md";
    CountryISO["Monaco"] = "mc";
    CountryISO["Mongolia"] = "mn";
    CountryISO["Montenegro"] = "me";
    CountryISO["Montserrat"] = "ms";
    CountryISO["Morocco"] = "ma";
    CountryISO["Mozambique"] = "mz";
    CountryISO["Myanmar"] = "mm";
    CountryISO["Namibia"] = "na";
    CountryISO["Nauru"] = "nr";
    CountryISO["Nepal"] = "np";
    CountryISO["Netherlands"] = "nl";
    CountryISO["NewCaledonia"] = "nc";
    CountryISO["NewZealand"] = "nz";
    CountryISO["Nicaragua"] = "ni";
    CountryISO["Niger"] = "ne";
    CountryISO["Nigeria"] = "ng";
    CountryISO["Niue"] = "nu";
    CountryISO["NorfolkIsland"] = "nf";
    CountryISO["NorthKorea"] = "kp";
    CountryISO["NorthernMarianaIslands"] = "mp";
    CountryISO["Norway"] = "no";
    CountryISO["Oman"] = "om";
    CountryISO["Pakistan"] = "pk";
    CountryISO["Palau"] = "pw";
    CountryISO["Palestine"] = "ps";
    CountryISO["Panama"] = "pa";
    CountryISO["PapuaNewGuinea"] = "pg";
    CountryISO["Paraguay"] = "py";
    CountryISO["Peru"] = "pe";
    CountryISO["Philippines"] = "ph";
    CountryISO["Poland"] = "pl";
    CountryISO["Portugal"] = "pt";
    CountryISO["PuertoRico"] = "pr";
    CountryISO["Qatar"] = "qa";
    CountryISO["R\u00E9union"] = "re";
    CountryISO["Romania"] = "ro";
    CountryISO["Russia"] = "ru";
    CountryISO["Rwanda"] = "rw";
    CountryISO["SaintBarth\u00E9lemy"] = "bl";
    CountryISO["SaintHelena"] = "sh";
    CountryISO["SaintKittsAndNevis"] = "kn";
    CountryISO["SaintLucia"] = "lc";
    CountryISO["SaintMartin"] = "mf";
    CountryISO["SaintPierreAndMiquelon"] = "pm";
    CountryISO["SaintVincentAndTheGrenadines"] = "vc";
    CountryISO["Samoa"] = "ws";
    CountryISO["SanMarino"] = "sm";
    CountryISO["S\u00E3oTom\u00E9AndPr\u00EDncipe"] = "st";
    CountryISO["SaudiArabia"] = "sa";
    CountryISO["Senegal"] = "sn";
    CountryISO["Serbia"] = "rs";
    CountryISO["Seychelles"] = "sc";
    CountryISO["SierraLeone"] = "sl";
    CountryISO["Singapore"] = "sg";
    CountryISO["SintMaarten"] = "sx";
    CountryISO["Slovakia"] = "sk";
    CountryISO["Slovenia"] = "si";
    CountryISO["SolomonIslands"] = "sb";
    CountryISO["Somalia"] = "so";
    CountryISO["SouthAfrica"] = "za";
    CountryISO["SouthKorea"] = "kr";
    CountryISO["SouthSudan"] = "ss";
    CountryISO["Spain"] = "es";
    CountryISO["SriLanka"] = "lk";
    CountryISO["Sudan"] = "sd";
    CountryISO["Suriname"] = "sr";
    CountryISO["SvalbardAndJanMayen"] = "sj";
    CountryISO["Swaziland"] = "sz";
    CountryISO["Sweden"] = "se";
    CountryISO["Switzerland"] = "ch";
    CountryISO["Syria"] = "sy";
    CountryISO["Taiwan"] = "tw";
    CountryISO["Tajikistan"] = "tj";
    CountryISO["Tanzania"] = "tz";
    CountryISO["Thailand"] = "th";
    CountryISO["TimorLeste"] = "tl";
    CountryISO["Togo"] = "tg";
    CountryISO["Tokelau"] = "tk";
    CountryISO["Tonga"] = "to";
    CountryISO["TrinidadAndTobago"] = "tt";
    CountryISO["Tunisia"] = "tn";
    CountryISO["Turkey"] = "tr";
    CountryISO["Turkmenistan"] = "tm";
    CountryISO["TurksAndCaicosIslands"] = "tc";
    CountryISO["Tuvalu"] = "tv";
    CountryISO["USVirginIslands"] = "vi";
    CountryISO["Uganda"] = "ug";
    CountryISO["Ukraine"] = "ua";
    CountryISO["UnitedArabEmirates"] = "ae";
    CountryISO["UnitedKingdom"] = "gb";
    CountryISO["UnitedStates"] = "us";
    CountryISO["Uruguay"] = "uy";
    CountryISO["Uzbekistan"] = "uz";
    CountryISO["Vanuatu"] = "vu";
    CountryISO["VaticanCity"] = "va";
    CountryISO["Venezuela"] = "ve";
    CountryISO["Vietnam"] = "vn";
    CountryISO["WallisAndFutuna"] = "wf";
    CountryISO["WesternSahara"] = "eh";
    CountryISO["Yemen"] = "ye";
    CountryISO["Zambia"] = "zm";
    CountryISO["Zimbabwe"] = "zw";
    CountryISO["\u00C5landIslands"] = "ax";
})(CountryISO || (CountryISO = {}));

// noinspection JSNonASCIINames
class CountryCode {
    constructor() {
        this.allCountries = [
            [
                'Afghanistan (‫افغانستان‬‎)',
                CountryISO.Afghanistan,
                '93'
            ],
            [
                'Albania (Shqipëri)',
                CountryISO.Albania,
                '355'
            ],
            [
                'Algeria (‫الجزائر‬‎)',
                CountryISO.Algeria,
                '213'
            ],
            [
                'American Samoa',
                'as',
                '1',
                1,
                [
                    '684',
                ]
            ],
            [
                'Andorra',
                CountryISO.Andorra,
                '376'
            ],
            [
                'Angola',
                CountryISO.Angola,
                '244'
            ],
            [
                'Anguilla',
                'ai',
                '1',
                1,
                [
                    '264',
                ]
            ],
            [
                'Antigua and Barbuda',
                'ag',
                '1',
                1,
                [
                    '268',
                ]
            ],
            [
                'Argentina',
                CountryISO.Argentina,
                '54'
            ],
            [
                'Armenia (Հայաստան)',
                CountryISO.Armenia,
                '374'
            ],
            [
                'Aruba',
                CountryISO.Aruba,
                '297'
            ],
            [
                'Australia',
                CountryISO.Australia,
                '61',
                0
            ],
            [
                'Austria (Österreich)',
                CountryISO.Austria,
                '43'
            ],
            [
                'Azerbaijan (Azərbaycan)',
                CountryISO.Azerbaijan,
                '994'
            ],
            [
                'Bahamas',
                'bs',
                '1',
                1,
                [
                    '242',
                ]
            ],
            [
                'Bahrain (‫البحرين‬‎)',
                CountryISO.Bahrain,
                '973'
            ],
            [
                'Bangladesh (বাংলাদেশ)',
                CountryISO.Bangladesh,
                '880'
            ],
            [
                'Barbados',
                'bb',
                '1',
                1,
                [
                    '246',
                ]
            ],
            [
                'Belarus (Беларусь)',
                CountryISO.Belarus,
                '375'
            ],
            [
                'Belgium (België)',
                CountryISO.Belgium,
                '32'
            ],
            [
                'Belize',
                CountryISO.Belize,
                '501'
            ],
            [
                'Benin (Bénin)',
                CountryISO.Benin,
                '229'
            ],
            [
                'Bermuda',
                'bm',
                '1',
                1,
                [
                    '441',
                ]
            ],
            [
                'Bhutan (འབྲུག)',
                CountryISO.Bhutan,
                '975'
            ],
            [
                'Bolivia',
                CountryISO.Bolivia,
                '591'
            ],
            [
                'Bosnia and Herzegovina (Босна и Херцеговина)',
                CountryISO.BosniaAndHerzegovina,
                '387'
            ],
            [
                'Botswana',
                CountryISO.Botswana,
                '267'
            ],
            [
                'Brazil (Brasil)',
                CountryISO.Brazil,
                '55'
            ],
            [
                'British Indian Ocean Territory',
                CountryISO.BritishIndianOceanTerritory,
                '246'
            ],
            [
                'British Virgin Islands',
                'vg',
                '1',
                1,
                [
                    '284',
                ]
            ],
            [
                'Brunei',
                CountryISO.Brunei,
                '673'
            ],
            [
                'Bulgaria (България)',
                CountryISO.Bulgaria,
                '359'
            ],
            [
                'Burkina Faso',
                CountryISO.BurkinaFaso,
                '226'
            ],
            [
                'Burundi (Uburundi)',
                CountryISO.Burundi,
                '257'
            ],
            [
                'Cambodia (កម្ពុជា)',
                CountryISO.Cambodia,
                '855'
            ],
            [
                'Cameroon (Cameroun)',
                CountryISO.Cameroon,
                '237'
            ],
            [
                'Canada',
                CountryISO.Canada,
                '1',
                1,
                [
                    '204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416',
                    '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587',
                    '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807',
                    '819', '825', '867', '873', '902', '905'
                ]
            ],
            [
                'Cape Verde (Kabu Verdi)',
                CountryISO.CapeVerde,
                '238'
            ],
            [
                'Caribbean Netherlands',
                CountryISO.CaribbeanNetherlands,
                '599',
                1
            ],
            [
                'Cayman Islands',
                'ky',
                '1',
                1,
                [
                    '345',
                ]
            ],
            [
                'Central African Republic (République centrafricaine)',
                CountryISO.CentralAfricanRepublic,
                '236'
            ],
            [
                'Chad (Tchad)',
                CountryISO.Chad,
                '235'
            ],
            [
                'Chile',
                CountryISO.Chile,
                '56'
            ],
            [
                'China (中国)',
                CountryISO.China,
                '86'
            ],
            [
                'Christmas Island',
                CountryISO.ChristmasIsland,
                '61',
                2
            ],
            [
                'Cocos (Keeling) Islands',
                CountryISO.Cocos,
                '61',
                1
            ],
            [
                'Colombia',
                CountryISO.Colombia,
                '57'
            ],
            [
                'Comoros (‫جزر القمر‬‎)',
                CountryISO.Comoros,
                '269'
            ],
            [
                'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
                CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo,
                '243'
            ],
            [
                'Congo (Republic) (Congo-Brazzaville)',
                CountryISO.CongoRepublicCongoBrazzaville,
                '242'
            ],
            [
                'Cook Islands',
                CountryISO.CookIslands,
                '682'
            ],
            [
                'Costa Rica',
                CountryISO.CostaRica,
                '506'
            ],
            [
                'Côte d’Ivoire',
                CountryISO.CôteDIvoire,
                '225'
            ],
            [
                'Croatia (Hrvatska)',
                CountryISO.Croatia,
                '385'
            ],
            [
                'Cuba',
                CountryISO.Cuba,
                '53'
            ],
            [
                'Curaçao',
                CountryISO.Curaçao,
                '599',
                0
            ],
            [
                'Cyprus (Κύπρος)',
                CountryISO.Cyprus,
                '357'
            ],
            [
                'Czech Republic (Česká republika)',
                CountryISO.CzechRepublic,
                '420'
            ],
            [
                'Denmark (Danmark)',
                CountryISO.Denmark,
                '45'
            ],
            [
                'Djibouti',
                CountryISO.Djibouti,
                '253'
            ],
            [
                'Dominica',
                CountryISO.Dominica,
                '1767'
            ],
            [
                'Dominican Republic (República Dominicana)',
                CountryISO.DominicanRepublic,
                '1',
                2,
                ['809', '829', '849']
            ],
            [
                'Ecuador',
                CountryISO.Ecuador,
                '593'
            ],
            [
                'Egypt (‫مصر‬‎)',
                CountryISO.Egypt,
                '20'
            ],
            [
                'El Salvador',
                CountryISO.ElSalvador,
                '503'
            ],
            [
                'Equatorial Guinea (Guinea Ecuatorial)',
                CountryISO.EquatorialGuinea,
                '240'
            ],
            [
                'Eritrea',
                CountryISO.Eritrea,
                '291'
            ],
            [
                'Estonia (Eesti)',
                CountryISO.Estonia,
                '372'
            ],
            [
                'Ethiopia',
                CountryISO.Ethiopia,
                '251'
            ],
            [
                'Falkland Islands (Islas Malvinas)',
                CountryISO.FalklandIslands,
                '500'
            ],
            [
                'Faroe Islands (Føroyar)',
                CountryISO.FaroeIslands,
                '298'
            ],
            [
                'Fiji',
                CountryISO.Fiji,
                '679'
            ],
            [
                'Finland (Suomi)',
                CountryISO.Finland,
                '358',
                0
            ],
            [
                'France',
                CountryISO.France,
                '33'
            ],
            [
                'French Guiana (Guyane française)',
                CountryISO.FrenchGuiana,
                '594'
            ],
            [
                'French Polynesia (Polynésie française)',
                CountryISO.FrenchPolynesia,
                '689'
            ],
            [
                'Gabon',
                CountryISO.Gabon,
                '241'
            ],
            [
                'Gambia',
                CountryISO.Gambia,
                '220'
            ],
            [
                'Georgia (საქართველო)',
                CountryISO.Georgia,
                '995'
            ],
            [
                'Germany (Deutschland)',
                CountryISO.Germany,
                '49'
            ],
            [
                'Ghana (Gaana)',
                CountryISO.Ghana,
                '233'
            ],
            [
                'Gibraltar',
                CountryISO.Gibraltar,
                '350'
            ],
            [
                'Greece (Ελλάδα)',
                CountryISO.Greece,
                '30'
            ],
            [
                'Greenland (Kalaallit Nunaat)',
                CountryISO.Greenland,
                '299'
            ],
            [
                'Grenada',
                CountryISO.Grenada,
                '1473'
            ],
            [
                'Guadeloupe',
                CountryISO.Guadeloupe,
                '590',
                0
            ],
            [
                'Guam',
                'gu',
                '1',
                1,
                [
                    '671',
                ]
            ],
            [
                'Guatemala',
                CountryISO.Guatemala,
                '502'
            ],
            [
                'Guernsey',
                CountryISO.Guernsey,
                '44',
                1,
                [1481]
            ],
            [
                'Guinea (Guinée)',
                CountryISO.Guinea,
                '224'
            ],
            [
                'Guinea-Bissau (Guiné Bissau)',
                CountryISO.GuineaBissau,
                '245'
            ],
            [
                'Guyana',
                CountryISO.Guyana,
                '592'
            ],
            [
                'Haiti',
                CountryISO.Haiti,
                '509'
            ],
            [
                'Honduras',
                CountryISO.Honduras,
                '504'
            ],
            [
                'Hong Kong (香港)',
                CountryISO.HongKong,
                '852'
            ],
            [
                'Hungary (Magyarország)',
                CountryISO.Hungary,
                '36'
            ],
            [
                'Iceland (Ísland)',
                CountryISO.Iceland,
                '354'
            ],
            [
                'India (भारत)',
                CountryISO.India,
                '91'
            ],
            [
                'Indonesia',
                CountryISO.Indonesia,
                '62'
            ],
            [
                'Iran (‫ایران‬‎)',
                CountryISO.Iran,
                '98'
            ],
            [
                'Iraq (‫العراق‬‎)',
                CountryISO.Iraq,
                '964'
            ],
            [
                'Ireland',
                CountryISO.Ireland,
                '353'
            ],
            [
                'Isle of Man',
                CountryISO.IsleOfMan,
                '44',
                2,
                [1624]
            ],
            [
                'Israel (‫ישראל‬‎)',
                CountryISO.Israel,
                '972'
            ],
            [
                'Italy (Italia)',
                CountryISO.Italy,
                '39',
                0
            ],
            [
                'Jamaica',
                'jm',
                '1',
                1,
                [
                    '876',
                ]
            ],
            [
                'Japan (日本)',
                CountryISO.Japan,
                '81'
            ],
            [
                'Jersey',
                CountryISO.Jersey,
                '44',
                3,
                [1534]
            ],
            [
                'Jordan (‫الأردن‬‎)',
                CountryISO.Jordan,
                '962'
            ],
            [
                'Kazakhstan (Казахстан)',
                CountryISO.Kazakhstan,
                '7',
                1,
                [33, 7]
            ],
            [
                'Kenya',
                CountryISO.Kenya,
                '254'
            ],
            [
                'Kiribati',
                CountryISO.Kiribati,
                '686'
            ],
            [
                'Kosovo',
                CountryISO.Kosovo,
                '383'
            ],
            [
                'Kuwait (‫الكويت‬‎)',
                CountryISO.Kuwait,
                '965'
            ],
            [
                'Kyrgyzstan (Кыргызстан)',
                CountryISO.Kyrgyzstan,
                '996'
            ],
            [
                'Laos (ລາວ)',
                CountryISO.Laos,
                '856'
            ],
            [
                'Latvia (Latvija)',
                CountryISO.Latvia,
                '371'
            ],
            [
                'Lebanon (‫لبنان‬‎)',
                CountryISO.Lebanon,
                '961'
            ],
            [
                'Lesotho',
                CountryISO.Lesotho,
                '266'
            ],
            [
                'Liberia',
                CountryISO.Liberia,
                '231'
            ],
            [
                'Libya (‫ليبيا‬‎)',
                CountryISO.Libya,
                '218'
            ],
            [
                'Liechtenstein',
                CountryISO.Liechtenstein,
                '423'
            ],
            [
                'Lithuania (Lietuva)',
                CountryISO.Lithuania,
                '370'
            ],
            [
                'Luxembourg',
                CountryISO.Luxembourg,
                '352'
            ],
            [
                'Macau (澳門)',
                CountryISO.Macau,
                '853'
            ],
            [
                'Macedonia (FYROM) (Македонија)',
                CountryISO.Macedonia,
                '389'
            ],
            [
                'Madagascar (Madagasikara)',
                CountryISO.Madagascar,
                '261'
            ],
            [
                'Malawi',
                CountryISO.Malawi,
                '265'
            ],
            [
                'Malaysia',
                CountryISO.Malaysia,
                '60'
            ],
            [
                'Maldives',
                CountryISO.Maldives,
                '960'
            ],
            [
                'Mali',
                CountryISO.Mali,
                '223'
            ],
            [
                'Malta',
                CountryISO.Malta,
                '356'
            ],
            [
                'Marshall Islands',
                CountryISO.MarshallIslands,
                '692'
            ],
            [
                'Martinique',
                CountryISO.Martinique,
                '596'
            ],
            [
                'Mauritania (‫موريتانيا‬‎)',
                CountryISO.Mauritania,
                '222'
            ],
            [
                'Mauritius (Moris)',
                CountryISO.Mauritius,
                '230'
            ],
            [
                'Mayotte',
                CountryISO.Mayotte,
                '262',
                1
            ],
            [
                'Mexico (México)',
                CountryISO.Mexico,
                '52'
            ],
            [
                'Micronesia',
                CountryISO.Micronesia,
                '691'
            ],
            [
                'Moldova (Republica Moldova)',
                CountryISO.Moldova,
                '373'
            ],
            [
                'Monaco',
                CountryISO.Monaco,
                '377'
            ],
            [
                'Mongolia (Монгол)',
                CountryISO.Mongolia,
                '976'
            ],
            [
                'Montenegro (Crna Gora)',
                CountryISO.Montenegro,
                '382'
            ],
            [
                'Montserrat',
                'ms',
                '1',
                1,
                [
                    '664',
                ]
            ],
            [
                'Morocco (‫المغرب‬‎)',
                CountryISO.Morocco,
                '212',
                0
            ],
            [
                'Mozambique (Moçambique)',
                CountryISO.Mozambique,
                '258'
            ],
            [
                'Myanmar (Burma) (မြန်မာ)',
                CountryISO.Myanmar,
                '95'
            ],
            [
                'Namibia (Namibië)',
                CountryISO.Namibia,
                '264'
            ],
            [
                'Nauru',
                CountryISO.Nauru,
                '674'
            ],
            [
                'Nepal (नेपाल)',
                CountryISO.Nepal,
                '977'
            ],
            [
                'Netherlands (Nederland)',
                CountryISO.Netherlands,
                '31'
            ],
            [
                'New Caledonia (Nouvelle-Calédonie)',
                CountryISO.NewCaledonia,
                '687'
            ],
            [
                'New Zealand',
                CountryISO.NewZealand,
                '64'
            ],
            [
                'Nicaragua',
                CountryISO.Nicaragua,
                '505'
            ],
            [
                'Niger (Nijar)',
                CountryISO.Niger,
                '227'
            ],
            [
                'Nigeria',
                CountryISO.Nigeria,
                '234'
            ],
            [
                'Niue',
                CountryISO.Niue,
                '683'
            ],
            [
                'Norfolk Island',
                CountryISO.NorfolkIsland,
                '672'
            ],
            [
                'North Korea (조선 민주주의 인민 공화국)',
                CountryISO.NorthKorea,
                '850'
            ],
            [
                'Northern Mariana Islands',
                CountryISO.NorthernMarianaIslands,
                '1670'
            ],
            [
                'Norway (Norge)',
                CountryISO.Norway,
                '47',
                0
            ],
            [
                'Oman (‫عُمان‬‎)',
                CountryISO.Oman,
                '968'
            ],
            [
                'Pakistan (‫پاکستان‬‎)',
                CountryISO.Pakistan,
                '92'
            ],
            [
                'Palau',
                CountryISO.Palau,
                '680'
            ],
            [
                'Palestine (‫فلسطين‬‎)',
                CountryISO.Palestine,
                '970'
            ],
            [
                'Panama (Panamá)',
                CountryISO.Panama,
                '507'
            ],
            [
                'Papua New Guinea',
                CountryISO.PapuaNewGuinea,
                '675'
            ],
            [
                'Paraguay',
                CountryISO.Paraguay,
                '595'
            ],
            [
                'Peru (Perú)',
                CountryISO.Peru,
                '51'
            ],
            [
                'Philippines',
                CountryISO.Philippines,
                '63'
            ],
            [
                'Poland (Polska)',
                CountryISO.Poland,
                '48'
            ],
            [
                'Portugal',
                CountryISO.Portugal,
                '351'
            ],
            [
                'Puerto Rico',
                CountryISO.PuertoRico,
                '1',
                3,
                ['787', '939']
            ],
            [
                'Qatar (‫قطر‬‎)',
                CountryISO.Qatar,
                '974'
            ],
            [
                'Réunion (La Réunion)',
                CountryISO.Réunion,
                '262',
                0
            ],
            [
                'Romania (România)',
                CountryISO.Romania,
                '40'
            ],
            [
                'Russia (Россия)',
                CountryISO.Russia,
                '7',
                0
            ],
            [
                'Rwanda',
                CountryISO.Rwanda,
                '250'
            ],
            [
                'Saint Barthélemy (Saint-Barthélemy)',
                CountryISO.SaintBarthélemy,
                '590',
                1
            ],
            [
                'Saint Helena',
                CountryISO.SaintHelena,
                '290'
            ],
            [
                'Saint Kitts and Nevis',
                CountryISO.SaintKittsAndNevis,
                '1869'
            ],
            [
                'Saint Lucia',
                'lc',
                '1',
                1,
                [
                    '758',
                ]
            ],
            [
                'Saint Martin (Saint-Martin (partie française))',
                CountryISO.SaintMartin,
                '590',
                2
            ],
            [
                'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
                CountryISO.SaintPierreAndMiquelon,
                '508'
            ],
            [
                'Saint Vincent and the Grenadines',
                'vc',
                '1',
                1,
                [
                    '784',
                ]
            ],
            [
                'Samoa',
                CountryISO.Samoa,
                '685'
            ],
            [
                'San Marino',
                CountryISO.SanMarino,
                '378'
            ],
            [
                'São Tomé and Príncipe (São Tomé e Príncipe)',
                CountryISO.SãoToméAndPríncipe,
                '239'
            ],
            [
                'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
                CountryISO.SaudiArabia,
                '966'
            ],
            [
                'Senegal (Sénégal)',
                CountryISO.Senegal,
                '221'
            ],
            [
                'Serbia (Србија)',
                CountryISO.Serbia,
                '381'
            ],
            [
                'Seychelles',
                CountryISO.Seychelles,
                '248'
            ],
            [
                'Sierra Leone',
                CountryISO.SierraLeone,
                '232'
            ],
            [
                'Singapore',
                CountryISO.Singapore,
                '65'
            ],
            [
                'Sint Maarten',
                'sx',
                '1',
                1,
                [
                    '721',
                ]
            ],
            [
                'Slovakia (Slovensko)',
                CountryISO.Slovakia,
                '421'
            ],
            [
                'Slovenia (Slovenija)',
                CountryISO.Slovenia,
                '386'
            ],
            [
                'Solomon Islands',
                CountryISO.SolomonIslands,
                '677'
            ],
            [
                'Somalia (Soomaaliya)',
                CountryISO.Somalia,
                '252'
            ],
            [
                'South Africa',
                CountryISO.SouthAfrica,
                '27'
            ],
            [
                'South Korea (대한민국)',
                CountryISO.SouthKorea,
                '82'
            ],
            [
                'South Sudan (‫جنوب السودان‬‎)',
                CountryISO.SouthSudan,
                '211'
            ],
            [
                'Spain (España)',
                CountryISO.Spain,
                '34'
            ],
            [
                'Sri Lanka (ශ්‍රී ලංකාව)',
                CountryISO.SriLanka,
                '94'
            ],
            [
                'Sudan (‫السودان‬‎)',
                CountryISO.Sudan,
                '249'
            ],
            [
                'Suriname',
                CountryISO.Suriname,
                '597'
            ],
            [
                'Svalbard and Jan Mayen',
                CountryISO.SvalbardAndJanMayen,
                '47',
                1
            ],
            [
                'Swaziland',
                CountryISO.Swaziland,
                '268'
            ],
            [
                'Sweden (Sverige)',
                CountryISO.Sweden,
                '46'
            ],
            [
                'Switzerland (Schweiz)',
                CountryISO.Switzerland,
                '41'
            ],
            [
                'Syria (‫سوريا‬‎)',
                CountryISO.Syria,
                '963'
            ],
            [
                'Taiwan (台灣)',
                CountryISO.Taiwan,
                '886'
            ],
            [
                'Tajikistan',
                CountryISO.Tajikistan,
                '992'
            ],
            [
                'Tanzania',
                CountryISO.Tanzania,
                '255'
            ],
            [
                'Thailand (ไทย)',
                CountryISO.Thailand,
                '66'
            ],
            [
                'Timor-Leste',
                CountryISO.TimorLeste,
                '670'
            ],
            [
                'Togo',
                CountryISO.Togo,
                '228'
            ],
            [
                'Tokelau',
                CountryISO.Tokelau,
                '690'
            ],
            [
                'Tonga',
                CountryISO.Tonga,
                '676'
            ],
            [
                'Trinidad and Tobago',
                'tt',
                '1',
                1,
                [
                    '868',
                ]
            ],
            [
                'Tunisia (‫تونس‬‎)',
                CountryISO.Tunisia,
                '216'
            ],
            [
                'Turkey (Türkiye)',
                CountryISO.Turkey,
                '90'
            ],
            [
                'Turkmenistan',
                CountryISO.Turkmenistan,
                '993'
            ],
            [
                'Turks and Caicos Islands',
                CountryISO.TurksAndCaicosIslands,
                '1649'
            ],
            [
                'Tuvalu',
                CountryISO.Tuvalu,
                '688'
            ],
            [
                'U.S. Virgin Islands',
                'vi',
                '1',
                1,
                [
                    '340',
                ]
            ],
            [
                'Uganda',
                CountryISO.Uganda,
                '256'
            ],
            [
                'Ukraine (Україна)',
                CountryISO.Ukraine,
                '380'
            ],
            [
                'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
                CountryISO.UnitedArabEmirates,
                '971'
            ],
            [
                'United Kingdom',
                CountryISO.UnitedKingdom,
                '44',
                0
            ],
            [
                'United States',
                CountryISO.UnitedStates,
                '1',
                0
            ],
            [
                'Uruguay',
                CountryISO.Uruguay,
                '598'
            ],
            [
                'Uzbekistan (Oʻzbekiston)',
                CountryISO.Uzbekistan,
                '998'
            ],
            [
                'Vanuatu',
                CountryISO.Vanuatu,
                '678'
            ],
            [
                'Vatican City (Città del Vaticano)',
                CountryISO.VaticanCity,
                '39',
                1
            ],
            [
                'Venezuela',
                CountryISO.Venezuela,
                '58'
            ],
            [
                'Vietnam (Việt Nam)',
                CountryISO.Vietnam,
                '84'
            ],
            [
                'Wallis and Futuna',
                CountryISO.WallisAndFutuna,
                '681'
            ],
            [
                'Western Sahara (‫الصحراء الغربية‬‎)',
                CountryISO.WesternSahara,
                '212',
                1
            ],
            [
                'Yemen (‫اليمن‬‎)',
                CountryISO.Yemen,
                '967'
            ],
            [
                'Zambia',
                CountryISO.Zambia,
                '260'
            ],
            [
                'Zimbabwe',
                CountryISO.Zimbabwe,
                '263'
            ],
            [
                'Åland Islands',
                CountryISO.ÅlandIslands,
                '358',
                1
            ]
        ];
    }
}

var SearchCountryField;
(function (SearchCountryField) {
    SearchCountryField["DialCode"] = "dialCode";
    SearchCountryField["Iso2"] = "iso2";
    SearchCountryField["Name"] = "name";
    SearchCountryField["All"] = "all";
})(SearchCountryField || (SearchCountryField = {}));

class NgxIntlTelInputService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputService, deps: [{ token: CountryCode }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: CountryCode }] });

class NgxIntlTelFormService {
    constructor() {
        this._submitted$ = new BehaviorSubject(false);
        this.submitted$ = this._submitted$.asObservable();
    }
    submit() {
        this._submitted$.next(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelFormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelFormService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelFormService, decorators: [{
            type: Injectable
        }] });

class NgxIntlTelModelAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelModelAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelModelAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelModelAdapter, decorators: [{
            type: Injectable
        }] });

class NgxDropdownService {
    constructor(overlay) {
        this.overlay = overlay;
        this._onMenuClose = new Subject();
        this.onMenuClose = this._onMenuClose.asObservable();
        this._menuState$ = new BehaviorSubject(false);
        this.menuState$ = this._menuState$.asObservable();
    }
    openFromTemplate(template, connectedElementRef, viewContainerRef, configOptions = {}) {
        const config = this._createConfig(configOptions, connectedElementRef);
        this._overlayRef = this.overlay.create(config);
        const templatePortal = new TemplatePortal(template, viewContainerRef);
        this._overlayRef.attach(templatePortal);
        this._menuState$.next(true);
        this._overlayRef.backdropClick().subscribe(() => {
            this.close();
        });
    }
    _createPosition(elementRef) {
        return this.overlay
            .position()
            .flexibleConnectedTo(elementRef)
            .withPositions([
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }
        ])
            .withPush(false);
    }
    _createConfig(config, connectedElementRef) {
        return {
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            positionStrategy: this._createPosition(connectedElementRef),
            scrollStrategy: this.overlay.scrollStrategies.reposition({ scrollThrottle: 0 }),
            ...config,
        };
    }
    close() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._onMenuClose.next();
            this._menuState$.next(false);
        }
    }
    scrollToCountry(country) {
        if (!country.iso2 || !this._overlayRef) {
            return;
        }
        const countryElement = this._overlayRef.overlayElement.querySelector(`#${country.iso2}`);
        if (countryElement) {
            countryElement.scrollIntoView();
        }
    }
    getMenuState() {
        return this._menuState$.value;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxDropdownService, deps: [{ token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxDropdownService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxDropdownService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.Overlay }] });

var CountryDropdownDisplayOptions;
(function (CountryDropdownDisplayOptions) {
    CountryDropdownDisplayOptions[CountryDropdownDisplayOptions["Flag"] = 0] = "Flag";
    CountryDropdownDisplayOptions[CountryDropdownDisplayOptions["Name"] = 1] = "Name";
    CountryDropdownDisplayOptions[CountryDropdownDisplayOptions["Dial"] = 2] = "Dial";
})(CountryDropdownDisplayOptions || (CountryDropdownDisplayOptions = {}));

var TooltipLabel;
(function (TooltipLabel) {
    TooltipLabel["Name"] = "name";
    TooltipLabel["Iso2"] = "iso2";
})(TooltipLabel || (TooltipLabel = {}));

const phoneNumberValidator = (ngxIntlTelInputComponent, ngxIntlTelModelAdapter) => {
    return (control) => {
        if (!ngxIntlTelInputComponent.phoneValidation) {
            return null;
        }
        const error = { invalidPhoneNumber: 'Phone number is invalid' };
        const stringPhoneNumber = ngxIntlTelModelAdapter.getValidationValue(control.value);
        let phoneNumber;
        try {
            phoneNumber = PhoneNumberUtil.getInstance().parse(stringPhoneNumber);
        }
        catch (e) { }
        if (stringPhoneNumber) {
            if (phoneNumber) {
                const phoneUtil = PhoneNumberUtil.getInstance();
                if (!phoneUtil.isValidNumberForRegion(phoneNumber, phoneUtil.getRegionCodeForNumber(phoneNumber))) {
                    return error;
                }
            }
            else {
                return error;
            }
        }
        return null;
    };
};

class NgxIntlTelInputErrorMatcher {
    constructor(customControl) {
        this.customControl = customControl;
    }
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(this.customControl && this.customControl.invalid
            && ((this.customControl.dirty && this.customControl.touched) || isSubmitted));
    }
}

class NgxIntlTelTriggerComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelTriggerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.10", type: NgxIntlTelTriggerComponent, selector: "ngx-intl-tel-trigger", inputs: { country: "country", showCode: "showCode", stroked: "stroked", tooltipField: "tooltipField", isMenuOpened: "isMenuOpened", isError: "isError" }, ngImport: i0, template: "<section class=\"ngx-intl-tel-trigger\"\r\n         [class.ngx-intl-tel-trigger_stroked]=\"stroked\"\r\n         [class.ngx-intl-tel-trigger_error]=\"isError\"\r\n         [class.ngx-intl-tel-trigger_opened]=\"isMenuOpened\">\r\n    <span class=\"ngx-intl-tel-trigger__flag iti-flag\"\r\n          [ngClass]=\"country.flagClass\"\r\n          [matTooltip]=\"country[tooltipField]\"\r\n          [matTooltipDisabled]=\"!tooltipField\"></span>\r\n    <mat-icon class=\"ngx-intl-tel-trigger__icon\"\r\n              [class.ngx-intl-tel-trigger__icon_error]=\"isError\"\r\n              [class.ngx-intl-tel-trigger__icon_active]=\"true\">\r\n        {{ 'arrow_drop_down' }}\r\n    </mat-icon>\r\n</section>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel-trigger{display:flex;width:100%;height:100%;min-width:68px;min-height:48px;align-items:center;box-sizing:border-box}.ngx-intl-tel-trigger_stroked{border:1px solid var(--ngx-intl-tel-color-border);border-radius:8px 0 0 8px;padding:0 0 0 16px;cursor:pointer;transition:.3s ease-in-out}.ngx-intl-tel-trigger_stroked .ngx-intl-tel-trigger__icon{color:var(--ngx-intl-tel-color-border);transition:.3s ease-in-out}.ngx-intl-tel-trigger_stroked:hover{border:1px solid var(--ngx-intl-tel-color-border-hover)}.ngx-intl-tel-trigger_stroked:hover .ngx-intl-tel-trigger__icon{color:var(--ngx-intl-tel-color-text)}.ngx-intl-tel-trigger_stroked:focus-within{border-bottom-left-radius:0}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_opened{border:1px solid var(--ngx-intl-tel-color-border-hover);background:var(--ngx-intl-tel-background-hover);border-bottom-left-radius:0}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_opened .ngx-intl-tel-trigger__icon{color:var(--ngx-intl-tel-color-text);transform:rotateX(180deg)}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error{border-color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error:hover{border:1px solid var(--ngx-intl-tel-error-color)}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error:hover .ngx-intl-tel-trigger__icon,.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error .ngx-intl-tel-trigger__icon_error{color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel-trigger__flag{display:block}.ngx-intl-tel-trigger__dial{display:none}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3.MatTooltip, selector: "[matTooltip]", inputs: ["matTooltipPosition", "matTooltipPositionAtOrigin", "matTooltipDisabled", "matTooltipShowDelay", "matTooltipHideDelay", "matTooltipTouchGestures", "matTooltip", "matTooltipClass"], exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelTriggerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-intl-tel-trigger', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"ngx-intl-tel-trigger\"\r\n         [class.ngx-intl-tel-trigger_stroked]=\"stroked\"\r\n         [class.ngx-intl-tel-trigger_error]=\"isError\"\r\n         [class.ngx-intl-tel-trigger_opened]=\"isMenuOpened\">\r\n    <span class=\"ngx-intl-tel-trigger__flag iti-flag\"\r\n          [ngClass]=\"country.flagClass\"\r\n          [matTooltip]=\"country[tooltipField]\"\r\n          [matTooltipDisabled]=\"!tooltipField\"></span>\r\n    <mat-icon class=\"ngx-intl-tel-trigger__icon\"\r\n              [class.ngx-intl-tel-trigger__icon_error]=\"isError\"\r\n              [class.ngx-intl-tel-trigger__icon_active]=\"true\">\r\n        {{ 'arrow_drop_down' }}\r\n    </mat-icon>\r\n</section>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel-trigger{display:flex;width:100%;height:100%;min-width:68px;min-height:48px;align-items:center;box-sizing:border-box}.ngx-intl-tel-trigger_stroked{border:1px solid var(--ngx-intl-tel-color-border);border-radius:8px 0 0 8px;padding:0 0 0 16px;cursor:pointer;transition:.3s ease-in-out}.ngx-intl-tel-trigger_stroked .ngx-intl-tel-trigger__icon{color:var(--ngx-intl-tel-color-border);transition:.3s ease-in-out}.ngx-intl-tel-trigger_stroked:hover{border:1px solid var(--ngx-intl-tel-color-border-hover)}.ngx-intl-tel-trigger_stroked:hover .ngx-intl-tel-trigger__icon{color:var(--ngx-intl-tel-color-text)}.ngx-intl-tel-trigger_stroked:focus-within{border-bottom-left-radius:0}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_opened{border:1px solid var(--ngx-intl-tel-color-border-hover);background:var(--ngx-intl-tel-background-hover);border-bottom-left-radius:0}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_opened .ngx-intl-tel-trigger__icon{color:var(--ngx-intl-tel-color-text);transform:rotateX(180deg)}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error{border-color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error:hover{border:1px solid var(--ngx-intl-tel-error-color)}.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error:hover .ngx-intl-tel-trigger__icon,.ngx-intl-tel-trigger_stroked.ngx-intl-tel-trigger_error .ngx-intl-tel-trigger__icon_error{color:var(--ngx-intl-tel-error-color)}.ngx-intl-tel-trigger__flag{display:block}.ngx-intl-tel-trigger__dial{display:none}\n"] }]
        }], propDecorators: { country: [{
                type: Input
            }], showCode: [{
                type: Input
            }], stroked: [{
                type: Input
            }], tooltipField: [{
                type: Input
            }], isMenuOpened: [{
                type: Input
            }], isError: [{
                type: Input
            }] } });

class NgxIntlTelCountryComponent {
    constructor() {
        this.countryClick = new EventEmitter();
    }
    get showFlag() {
        return this.dropdownParams.some(value => value === CountryDropdownDisplayOptions.Flag);
    }
    get showName() {
        return this.dropdownParams.some(value => value === CountryDropdownDisplayOptions.Name);
    }
    get showDial() {
        return this.dropdownParams.some(value => value === CountryDropdownDisplayOptions.Dial);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelCountryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.10", type: NgxIntlTelCountryComponent, selector: "ngx-intl-tel-country", inputs: { countries: "countries", dropdownParams: "dropdownParams", stroked: "stroked" }, outputs: { countryClick: "countryClick" }, ngImport: i0, template: "<button class=\"ngx-intl-tel-country\"\r\n        [class.ngx-intl-tel-country_stroked]=\"stroked\"\r\n        [id]=\"country.iso2\"\r\n        *ngFor=\"let country of countries\"\r\n        (click)=\"countryClick.emit(country)\">\r\n    <span *ngIf=\"showFlag\"\r\n          class=\"iti-flag\r\n                 ngx-intl-tel-country__flag\"\r\n          [ngClass]=\"country.flagClass\"></span>\r\n    <span *ngIf=\"showName\"\r\n          class=\"ngx-intl-tel-country__name\">{{country.name}}</span>\r\n    <span *ngIf=\"showDial\"\r\n          class=\"ngx-intl-tel-country__dial\">+{{country.dialCode}}</span>\r\n</button>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel-country{display:flex;align-items:center;width:100%;background-color:#fff;border:1px solid #fff}.ngx-intl-tel-country_stroked{font-family:Source Sans Pro,sans-serif;font-size:14px;font-weight:400;line-height:18px;color:var(--ngx-intl-tel-color-text);font-weight:600;height:23px;transition:.2s ease-in-out;outline-color:#fff}.ngx-intl-tel-country_stroked:hover{background:var(--ngx-intl-tel-background-hover)}.ngx-intl-tel-country__flag{display:block}.ngx-intl-tel-country__name,.ngx-intl-tel-country__dial{padding-left:8px}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelCountryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-intl-tel-country', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button class=\"ngx-intl-tel-country\"\r\n        [class.ngx-intl-tel-country_stroked]=\"stroked\"\r\n        [id]=\"country.iso2\"\r\n        *ngFor=\"let country of countries\"\r\n        (click)=\"countryClick.emit(country)\">\r\n    <span *ngIf=\"showFlag\"\r\n          class=\"iti-flag\r\n                 ngx-intl-tel-country__flag\"\r\n          [ngClass]=\"country.flagClass\"></span>\r\n    <span *ngIf=\"showName\"\r\n          class=\"ngx-intl-tel-country__name\">{{country.name}}</span>\r\n    <span *ngIf=\"showDial\"\r\n          class=\"ngx-intl-tel-country__dial\">+{{country.dialCode}}</span>\r\n</button>\r\n", styles: [":root{--ngx-intl-tel-color-text: #404E84;--ngx-intl-tel-color-label: #7078A7;--ngx-intl-tel-color-border: #DEE2EE;--ngx-intl-tel-color-border-hover: #AFB3CF;--ngx-intl-tel-color-placeholder: #C3C6DC;--ngx-intl-tel-background-hover: #F3F6FD;--ngx-intl-tel-error-color: #EA5D73;--ngx-intl-tel-shadow: 0px 5px 24px rgba(57, 65, 92, .15);--mat-error-margin-top: 2px;--mat-subscript-wrapper-margin-top: 18px}.cdk-overlay-connected-position-bounding-box{transform:translateY(-1px)}.ngx-intl-tel-country{display:flex;align-items:center;width:100%;background-color:#fff;border:1px solid #fff}.ngx-intl-tel-country_stroked{font-family:Source Sans Pro,sans-serif;font-size:14px;font-weight:400;line-height:18px;color:var(--ngx-intl-tel-color-text);font-weight:600;height:23px;transition:.2s ease-in-out;outline-color:#fff}.ngx-intl-tel-country_stroked:hover{background:var(--ngx-intl-tel-background-hover)}.ngx-intl-tel-country__flag{display:block}.ngx-intl-tel-country__name,.ngx-intl-tel-country__dial{padding-left:8px}\n"] }]
        }], propDecorators: { countries: [{
                type: Input
            }], dropdownParams: [{
                type: Input
            }], stroked: [{
                type: Input
            }], countryClick: [{
                type: Output
            }] } });

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputComponent, deps: [{ token: NgxIntlTelInputService }, { token: NgxIntlTelFormService }, { token: NgxDropdownService }, { token: NgxIntlTelModelAdapter }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component }); }
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
        ], viewQueries: [{ propertyName: "dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true, static: true }, { propertyName: "connectedElement", first: true, predicate: ["connectedElement"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"ngx-intl-tel\"\r\n     [class.ngx-intl-tel_stroked]=\"stroked\"\r\n     [class.ngx-intl-tel_error]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n     [class.ngx-intl-tel_opened]=\"ngxDropdownService.menuState$ | async\"\r\n     [class.ngx-intl-tel_focus]=\"isFocused\">\r\n    <ngx-intl-tel-trigger *ngIf=\"!disableCountrySelect\"\r\n                          class=\"ngx-intl-tel__trigger\"\r\n                          [class.ngx-intl-tel__trigger_small]=\"small\"\r\n                          #connectedElement\r\n                          [country]=\"selectedCountry\"\r\n                          [isError]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n                          [isMenuOpened]=\"ngxDropdownService.menuState$ | async\"\r\n                          [tooltipField]=\"tooltipField\"\r\n                          [stroked]=\"stroked\"\r\n                          (click)=\"openDropdown()\">\r\n    </ngx-intl-tel-trigger>\r\n    <mat-form-field [floatLabel]=\"floatLabel\"\r\n                    class=\"ngx-intl-tel__form-field\"\r\n                    [class.ngx-intl-tel__form-field_small]=\"small\">\r\n        <mat-label class=\"ngx-intl-tel__label\">\r\n            {{ inputLabel }}\r\n        </mat-label>\r\n        <input class=\"ngx-intl-tel__input\"\r\n               #focusable\r\n               matInput\r\n               type=\"tel\"\r\n               autocomplete=\"off\"\r\n               [id]=\"id\"\r\n               [ngClass]=\"cssClass\"\r\n               [disabled]=\"disabled\"\r\n               [placeholder]=\"removeDialCode(selectedCountry?.placeHolder || '')\"\r\n               [attr.maxLength]=\"maxLength\"\r\n               [attr.validation]=\"phoneValidation\"\r\n               [errorStateMatcher]=\"errorStateMatcher\"\r\n               [(ngModel)]=\"phoneNumber\"\r\n               (ngModelChange)=\"onPhoneNumberChange()\"\r\n               (blur)=\"onBlurEvent()\"\r\n               (focus)=\"onFocusEvent()\"\r\n               (keydown)=\"ngxIntlTelInputService.onInputKeyPress($event)\">\r\n        <button *ngIf=\"clearIcon\"\r\n                mat-icon-button\r\n                matSuffix\r\n                (click)=\"onClearClick($event)\">\r\n            <mat-icon>{{ clearIcon }}</mat-icon>\r\n        </button>\r\n        <mat-error *ngIf=\"matErrorContainer.children.length === 0 && hasError\">\r\n            {{ (errors && errors[errorKey]) || control.getError(errorKey) }}\r\n        </mat-error>\r\n        <div #matErrorContainer>\r\n            <ng-content select=\"mat-error\"></ng-content>\r\n        </div>\r\n    </mat-form-field>\r\n    <ng-template #dropdownTemplate>\r\n        <div [class]=\"dropdownClass\">\r\n            <ngx-intl-tel-country [countries]=\"preferredCountriesInDropDown\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n            <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\r\n            <ngx-intl-tel-country [countries]=\"ngxIntlTelInputService.allCountries\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n        </div>\r\n    </ng-template>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i7.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i7.MatLabel, selector: "mat-label" }, { kind: "directive", type: i7.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i9.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i10.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "component", type: NgxIntlTelTriggerComponent, selector: "ngx-intl-tel-trigger", inputs: ["country", "showCode", "stroked", "tooltipField", "isMenuOpened", "isError"] }, { kind: "component", type: NgxIntlTelCountryComponent, selector: "ngx-intl-tel-country", inputs: ["countries", "dropdownParams", "stroked"], outputs: ["countryClick"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }], encapsulation: i0.ViewEncapsulation.None }); }
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
                    ], template: "<div class=\"ngx-intl-tel\"\r\n     [class.ngx-intl-tel_stroked]=\"stroked\"\r\n     [class.ngx-intl-tel_error]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n     [class.ngx-intl-tel_opened]=\"ngxDropdownService.menuState$ | async\"\r\n     [class.ngx-intl-tel_focus]=\"isFocused\">\r\n    <ngx-intl-tel-trigger *ngIf=\"!disableCountrySelect\"\r\n                          class=\"ngx-intl-tel__trigger\"\r\n                          [class.ngx-intl-tel__trigger_small]=\"small\"\r\n                          #connectedElement\r\n                          [country]=\"selectedCountry\"\r\n                          [isError]=\"invalid && (dirtyAndTouched || (ngxIntlTelForm.submitted$ | async))\"\r\n                          [isMenuOpened]=\"ngxDropdownService.menuState$ | async\"\r\n                          [tooltipField]=\"tooltipField\"\r\n                          [stroked]=\"stroked\"\r\n                          (click)=\"openDropdown()\">\r\n    </ngx-intl-tel-trigger>\r\n    <mat-form-field [floatLabel]=\"floatLabel\"\r\n                    class=\"ngx-intl-tel__form-field\"\r\n                    [class.ngx-intl-tel__form-field_small]=\"small\">\r\n        <mat-label class=\"ngx-intl-tel__label\">\r\n            {{ inputLabel }}\r\n        </mat-label>\r\n        <input class=\"ngx-intl-tel__input\"\r\n               #focusable\r\n               matInput\r\n               type=\"tel\"\r\n               autocomplete=\"off\"\r\n               [id]=\"id\"\r\n               [ngClass]=\"cssClass\"\r\n               [disabled]=\"disabled\"\r\n               [placeholder]=\"removeDialCode(selectedCountry?.placeHolder || '')\"\r\n               [attr.maxLength]=\"maxLength\"\r\n               [attr.validation]=\"phoneValidation\"\r\n               [errorStateMatcher]=\"errorStateMatcher\"\r\n               [(ngModel)]=\"phoneNumber\"\r\n               (ngModelChange)=\"onPhoneNumberChange()\"\r\n               (blur)=\"onBlurEvent()\"\r\n               (focus)=\"onFocusEvent()\"\r\n               (keydown)=\"ngxIntlTelInputService.onInputKeyPress($event)\">\r\n        <button *ngIf=\"clearIcon\"\r\n                mat-icon-button\r\n                matSuffix\r\n                (click)=\"onClearClick($event)\">\r\n            <mat-icon>{{ clearIcon }}</mat-icon>\r\n        </button>\r\n        <mat-error *ngIf=\"matErrorContainer.children.length === 0 && hasError\">\r\n            {{ (errors && errors[errorKey]) || control.getError(errorKey) }}\r\n        </mat-error>\r\n        <div #matErrorContainer>\r\n            <ng-content select=\"mat-error\"></ng-content>\r\n        </div>\r\n    </mat-form-field>\r\n    <ng-template #dropdownTemplate>\r\n        <div [class]=\"dropdownClass\">\r\n            <ngx-intl-tel-country [countries]=\"preferredCountriesInDropDown\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n            <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\r\n            <ngx-intl-tel-country [countries]=\"ngxIntlTelInputService.allCountries\"\r\n                                  [dropdownParams]=\"dropdownParamsData\"\r\n                                  [stroked]=\"stroked\"\r\n                                  (countryClick)=\"onCountrySelect($event, focusable)\">\r\n            </ngx-intl-tel-country>\r\n        </div>\r\n    </ng-template>\r\n</div>\r\n" }]
        }], ctorParameters: () => [{ type: NgxIntlTelInputService }, { type: NgxIntlTelFormService }, { type: NgxDropdownService }, { type: NgxIntlTelModelAdapter }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i0.Injector }], propDecorators: { onKeyPress: [{
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

class ComponentsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: ComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.10", ngImport: i0, type: ComponentsModule, declarations: [NgxIntlTelTriggerComponent, NgxIntlTelCountryComponent], imports: [CommonModule,
            MatIconModule,
            MatMenuModule,
            MatTooltipModule], exports: [NgxIntlTelTriggerComponent,
            NgxIntlTelCountryComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: ComponentsModule, imports: [CommonModule,
            MatIconModule,
            MatMenuModule,
            MatTooltipModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: ComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxIntlTelTriggerComponent, NgxIntlTelCountryComponent],
                    exports: [
                        NgxIntlTelTriggerComponent,
                        NgxIntlTelCountryComponent
                    ],
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatMenuModule,
                        MatTooltipModule
                    ]
                }]
        }] });

class NgxIntlTelInputModule {
    static forRoot() {
        return {
            ngModule: NgxIntlTelInputModule,
            providers: [
                NgxIntlTelInputService,
                NgxDropdownService,
                NgxIntlTelFormService
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputModule, declarations: [NgxIntlTelInputComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            MatMenuModule,
            MatDividerModule,
            ComponentsModule,
            ScrollingModule,
            MatIconModule], exports: [NgxIntlTelInputComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputModule, providers: [
            NgxIntlTelFormService,
        ], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            MatMenuModule,
            MatDividerModule,
            ComponentsModule,
            ScrollingModule,
            MatIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10", ngImport: i0, type: NgxIntlTelInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxIntlTelInputComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatButtonModule,
                        MatSelectModule,
                        MatMenuModule,
                        MatDividerModule,
                        ComponentsModule,
                        ScrollingModule,
                        MatIconModule
                    ],
                    providers: [
                        NgxIntlTelFormService,
                    ],
                    exports: [NgxIntlTelInputComponent]
                }]
        }] });

/*
 * Public API Surface of ngx-intl-tel-input
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CountryDropdownDisplayOptions, CountryISO, NgxDropdownService, NgxIntlTelFormService, NgxIntlTelInputComponent, NgxIntlTelInputModule, NgxIntlTelInputService, NgxIntlTelModelAdapter, SearchCountryField, TooltipLabel };
//# sourceMappingURL=wenor-ngx-intl-tel-input.mjs.map
