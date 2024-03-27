import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class NgxDropdownService {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NgxDropdownService, deps: [{ token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NgxDropdownService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NgxDropdownService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.Overlay }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3Bkb3duLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW50bC10ZWwtaW5wdXQvc3JjL2xpYi9zZXJ2aWNlcy9uZ3gtZHJvcGRvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFnQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsT0FBTyxFQUE4QyxNQUFNLHNCQUFzQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBTTFELE1BQU0sT0FBTyxrQkFBa0I7SUFZN0IsWUFBNkIsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQVI1QixpQkFBWSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRTFELGdCQUFXLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekQsZ0JBQVcsR0FBNkIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFcEYsZUFBVSxHQUF3QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRzNFLENBQUM7SUFFRCxnQkFBZ0IsQ0FDZCxRQUF3QixFQUN4QixtQkFBK0IsRUFDL0IsZ0JBQWtDLEVBQ2xDLGdCQUErQixFQUFFO1FBRWpDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLGNBQWMsR0FBc0IsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxVQUFzQjtRQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPO2FBQ2hCLFFBQVEsRUFBRTthQUNWLG1CQUFtQixDQUFDLFVBQVUsQ0FBQzthQUMvQixhQUFhLENBQUM7WUFDYixFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7U0FDMUUsQ0FBQzthQUNELFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQXFCLEVBQUUsbUJBQStCO1FBQzFFLE9BQU87WUFDTCxXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsa0NBQWtDO1lBQ2pELGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUM7WUFDM0QsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUMsY0FBYyxFQUFFLENBQUMsRUFBQyxDQUFDO1lBQzdFLEdBQUcsTUFBTTtTQUNWLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLElBQUksY0FBYyxFQUFFLENBQUM7WUFDbkIsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs4R0F2RVUsa0JBQWtCO2tIQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge092ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYsIFBvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHtUZW1wbGF0ZVBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtDb3VudHJ5fSBmcm9tICcuLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERyb3Bkb3duU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX29uTWVudUNsb3NlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgcmVhZG9ubHkgb25NZW51Q2xvc2U6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9vbk1lbnVDbG9zZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVudVN0YXRlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIHJlYWRvbmx5IG1lbnVTdGF0ZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9tZW51U3RhdGUkLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG92ZXJsYXk6IE92ZXJsYXkpIHtcclxuICB9XHJcblxyXG4gIG9wZW5Gcm9tVGVtcGxhdGU8VD4oXHJcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8VD4sXHJcbiAgICBjb25uZWN0ZWRFbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIGNvbmZpZ09wdGlvbnM6IE92ZXJsYXlDb25maWcgPSB7fVxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fY3JlYXRlQ29uZmlnKGNvbmZpZ09wdGlvbnMsIGNvbm5lY3RlZEVsZW1lbnRSZWYpO1xyXG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcclxuICAgIGNvbnN0IHRlbXBsYXRlUG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxUPiA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0ZW1wbGF0ZSwgdmlld0NvbnRhaW5lclJlZik7XHJcbiAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0ZW1wbGF0ZVBvcnRhbCk7XHJcbiAgICB0aGlzLl9tZW51U3RhdGUkLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLl9vdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZVBvc2l0aW9uKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBQb3NpdGlvblN0cmF0ZWd5IHtcclxuICAgIHJldHVybiB0aGlzLm92ZXJsYXlcclxuICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8oZWxlbWVudFJlZilcclxuICAgICAgLndpdGhQb3NpdGlvbnMoW1xyXG4gICAgICAgIHtvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJ31cclxuICAgICAgXSlcclxuICAgICAgLndpdGhQdXNoKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZUNvbmZpZyhjb25maWc6IE92ZXJsYXlDb25maWcsIGNvbm5lY3RlZEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBPdmVybGF5Q29uZmlnIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxyXG4gICAgICBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxyXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9jcmVhdGVQb3NpdGlvbihjb25uZWN0ZWRFbGVtZW50UmVmKSxcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oe3Njcm9sbFRocm90dGxlOiAwfSksXHJcbiAgICAgIC4uLmNvbmZpZyxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XHJcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xyXG4gICAgICB0aGlzLl9vbk1lbnVDbG9zZS5uZXh0KCk7XHJcbiAgICAgIHRoaXMuX21lbnVTdGF0ZSQubmV4dChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb0NvdW50cnkoY291bnRyeTogQ291bnRyeSk6IHZvaWQge1xyXG4gICAgaWYgKCFjb3VudHJ5LmlzbzIgfHwgIXRoaXMuX292ZXJsYXlSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY291bnRyeUVsZW1lbnQgPSB0aGlzLl9vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvdW50cnkuaXNvMn1gKTtcclxuICAgIGlmIChjb3VudHJ5RWxlbWVudCkge1xyXG4gICAgICBjb3VudHJ5RWxlbWVudC5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TWVudVN0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX21lbnVTdGF0ZSQudmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==