import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { Country } from '../model/country.model';
import * as i0 from "@angular/core";
export declare class NgxDropdownService {
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
