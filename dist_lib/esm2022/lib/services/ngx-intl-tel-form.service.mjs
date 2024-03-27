import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
class NgxIntlTelFormService {
    constructor() {
        this._submitted$ = new BehaviorSubject(false);
        this.submitted$ = this._submitted$.asObservable();
    }
    submit() {
        this._submitted$.next(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelFormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelFormService }); }
}
export { NgxIntlTelFormService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelFormService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL3NlcnZpY2VzL25neC1pbnRsLXRlbC1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFhLE1BQU0sTUFBTSxDQUFDOztBQUVqRCxNQUNhLHFCQUFxQjtJQURsQztRQUdtQixnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUNwRixlQUFVLEdBQXdCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7S0FLNUU7SUFIQyxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs4R0FQVSxxQkFBcUI7a0hBQXJCLHFCQUFxQjs7U0FBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsRm9ybVNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9zdWJtaXR0ZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICByZWFkb25seSBzdWJtaXR0ZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5fc3VibWl0dGVkJC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3VibWl0dGVkJC5uZXh0KHRydWUpO1xyXG4gIH1cclxufVxyXG4iXX0=