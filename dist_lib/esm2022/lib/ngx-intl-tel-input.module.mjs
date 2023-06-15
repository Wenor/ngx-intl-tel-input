import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ComponentsModule } from './components/components.module';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
import { NgxDropdownService } from './services/ngx-dropdown.service';
import { NgxIntlTelFormService } from './services/ngx-intl-tel-form.service';
import { NgxIntlTelInputService } from './services/ngx-intl-tel-input.service';
import * as i0 from "@angular/core";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelInputModule, declarations: [NgxIntlTelInputComponent], imports: [CommonModule,
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
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelInputModule, providers: [
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
export { NgxIntlTelInputModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.3", ngImport: i0, type: NgxIntlTelInputModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsSUFBSSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsd0JBQXdCLElBQUksa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRyxPQUFPLEVBQUUsb0JBQW9CLElBQUksY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixJQUFJLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxxQkFBcUIsSUFBSSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFFL0UsTUFxQmEscUJBQXFCO0lBQ2hDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFO2dCQUNULHNCQUFzQjtnQkFDdEIsa0JBQWtCO2dCQUNsQixxQkFBcUI7YUFDdEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs4R0FWVSxxQkFBcUI7K0dBQXJCLHFCQUFxQixpQkFwQmpCLHdCQUF3QixhQUVyQyxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFDbEIsY0FBYztZQUNkLGVBQWU7WUFDZixlQUFlO1lBQ2YsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLGFBQWEsYUFLTCx3QkFBd0I7K0dBRXZCLHFCQUFxQixhQUxyQjtZQUNULHFCQUFxQjtTQUN0QixZQWZDLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2QsZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsYUFBYTs7U0FPSixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFyQmpDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3hDLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QscUJBQXFCO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1hdERpdmlkZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaXZpZGVyJztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRMZWdhY3lCdXR0b25Nb2R1bGUgYXMgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWJ1dHRvbic7XHJcbmltcG9ydCB7IE1hdExlZ2FjeUZvcm1GaWVsZE1vZHVsZSBhcyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktZm9ybS1maWVsZCc7XHJcbmltcG9ydCB7IE1hdExlZ2FjeUlucHV0TW9kdWxlIGFzIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWlucHV0JztcclxuaW1wb3J0IHsgTWF0TGVnYWN5TWVudU1vZHVsZSBhcyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LW1lbnUnO1xyXG5pbXBvcnQgeyBNYXRMZWdhY3lTZWxlY3RNb2R1bGUgYXMgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LXNlbGVjdCc7XHJcbmltcG9ydCB7IENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hEcm9wZG93blNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1kcm9wZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtZm9ybS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbElucHV0U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmd4LWludGwtdGVsLWlucHV0LnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0TWVudU1vZHVsZSxcclxuICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICBDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBOZ3hJbnRsVGVsRm9ybVNlcnZpY2UsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTmd4SW50bFRlbElucHV0Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neEludGxUZWxJbnB1dE1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE5neEludGxUZWxJbnB1dE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgTmd4SW50bFRlbElucHV0U2VydmljZSxcclxuICAgICAgICBOZ3hEcm9wZG93blNlcnZpY2UsXHJcbiAgICAgICAgTmd4SW50bFRlbEZvcm1TZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==