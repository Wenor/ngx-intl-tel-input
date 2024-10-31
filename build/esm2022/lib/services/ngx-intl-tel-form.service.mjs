import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class NgxIntlTelFormService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL3NlcnZpY2VzL25neC1pbnRsLXRlbC1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFhLE1BQU0sTUFBTSxDQUFDOztBQUdqRCxNQUFNLE9BQU8scUJBQXFCO0lBRGxDO1FBR21CLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ3BGLGVBQVUsR0FBd0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUs1RTtJQUhDLE1BQU07UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDOytHQVBVLHFCQUFxQjttSEFBckIscUJBQXFCOzs0RkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbEZvcm1TZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfc3VibWl0dGVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcbiAgcmVhZG9ubHkgc3VibWl0dGVkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuX3N1Ym1pdHRlZCQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIHN1Ym1pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1Ym1pdHRlZCQubmV4dCh0cnVlKTtcclxuICB9XHJcbn1cclxuIl19