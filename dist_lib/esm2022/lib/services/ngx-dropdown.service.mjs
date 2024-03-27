import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxDropdownService, deps: [{ token: i1.Overlay }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxDropdownService, providedIn: 'root' }); }
}
export { NgxDropdownService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxDropdownService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyb3Bkb3duLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtaW50bC10ZWwtaW5wdXQvc3JjL2xpYi9zZXJ2aWNlcy9uZ3gtZHJvcGRvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFnQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsT0FBTyxFQUE4QyxNQUFNLHNCQUFzQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsZUFBZSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBRzFELE1BR2Esa0JBQWtCO0lBWTdCLFlBQTZCLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFSNUIsaUJBQVksR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUUxRCxnQkFBVyxHQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXpELGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRXBGLGVBQVUsR0FBd0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUczRSxDQUFDO0lBRUQsZ0JBQWdCLENBQ2QsUUFBd0IsRUFDeEIsbUJBQStCLEVBQy9CLGdCQUFrQyxFQUNsQyxnQkFBK0IsRUFBRTtRQUVqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsTUFBTSxjQUFjLEdBQXNCLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsVUFBc0I7UUFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTzthQUNoQixRQUFRLEVBQUU7YUFDVixtQkFBbUIsQ0FBQyxVQUFVLENBQUM7YUFDL0IsYUFBYSxDQUFDO1lBQ2IsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDO1NBQzFFLENBQUM7YUFDRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFxQixFQUFFLG1CQUErQjtRQUMxRSxPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUk7WUFDakIsYUFBYSxFQUFFLGtDQUFrQztZQUNqRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDO1lBQzNELGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUM3RSxHQUFHLE1BQU07U0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEMsT0FBTztTQUNSO1FBQ0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekYsSUFBSSxjQUFjLEVBQUU7WUFDbEIsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ2hDLENBQUM7OEdBdkVVLGtCQUFrQjtrSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07O1NBRVAsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiwgUG9zaXRpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQge1RlbXBsYXRlUG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvdW50cnl9IGZyb20gJy4uL21vZGVsL2NvdW50cnkubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RHJvcGRvd25TZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfb25NZW51Q2xvc2U6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICByZWFkb25seSBvbk1lbnVDbG9zZTogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX29uTWVudUNsb3NlLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9tZW51U3RhdGUkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuXHJcbiAgcmVhZG9ubHkgbWVudVN0YXRlJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX21lbnVTdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgb3ZlcmxheTogT3ZlcmxheSkge1xyXG4gIH1cclxuXHJcbiAgb3BlbkZyb21UZW1wbGF0ZTxUPihcclxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxUPixcclxuICAgIGNvbm5lY3RlZEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgY29uZmlnT3B0aW9uczogT3ZlcmxheUNvbmZpZyA9IHt9XHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jcmVhdGVDb25maWcoY29uZmlnT3B0aW9ucywgY29ubmVjdGVkRWxlbWVudFJlZik7XHJcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShjb25maWcpO1xyXG4gICAgY29uc3QgdGVtcGxhdGVQb3J0YWw6IFRlbXBsYXRlUG9ydGFsPFQ+ID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRlbXBsYXRlLCB2aWV3Q29udGFpbmVyUmVmKTtcclxuICAgIHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKHRlbXBsYXRlUG9ydGFsKTtcclxuICAgIHRoaXMuX21lbnVTdGF0ZSQubmV4dCh0cnVlKTtcclxuICAgIHRoaXMuX292ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlUG9zaXRpb24oZWxlbWVudFJlZjogRWxlbWVudFJlZik6IFBvc2l0aW9uU3RyYXRlZ3kge1xyXG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheVxyXG4gICAgICAucG9zaXRpb24oKVxyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyhlbGVtZW50UmVmKVxyXG4gICAgICAud2l0aFBvc2l0aW9ucyhbXHJcbiAgICAgICAge29yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnfVxyXG4gICAgICBdKVxyXG4gICAgICAud2l0aFB1c2goZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY3JlYXRlQ29uZmlnKGNvbmZpZzogT3ZlcmxheUNvbmZpZywgY29ubmVjdGVkRWxlbWVudFJlZjogRWxlbWVudFJlZik6IE92ZXJsYXlDb25maWcge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXHJcbiAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXHJcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX2NyZWF0ZVBvc2l0aW9uKGNvbm5lY3RlZEVsZW1lbnRSZWYpLFxyXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbih7c2Nyb2xsVGhyb3R0bGU6IDB9KSxcclxuICAgICAgLi4uY29uZmlnLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcclxuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuX29uTWVudUNsb3NlLm5leHQoKTtcclxuICAgICAgdGhpcy5fbWVudVN0YXRlJC5uZXh0KGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjcm9sbFRvQ291bnRyeShjb3VudHJ5OiBDb3VudHJ5KTogdm9pZCB7XHJcbiAgICBpZiAoIWNvdW50cnkuaXNvMiB8fCAhdGhpcy5fb3ZlcmxheVJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb3VudHJ5RWxlbWVudCA9IHRoaXMuX292ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y291bnRyeS5pc28yfWApO1xyXG4gICAgaWYgKGNvdW50cnlFbGVtZW50KSB7XHJcbiAgICAgIGNvdW50cnlFbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRNZW51U3RhdGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWVudVN0YXRlJC52YWx1ZTtcclxuICB9XHJcbn1cclxuIl19