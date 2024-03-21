import { NgModule } from '@angular/core';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputService } from './services/ngx-intl-tel-input.service';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatDividerModule } from '@angular/material/divider';
import { ComponentsModule } from './components/components.module';
import { NgxDropdownService } from './services/ngx-dropdown.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxIntlTelFormService } from './services/ngx-intl-tel-form.service';
import { MatIconModule } from '@angular/material/icon';
import * as i0 from "@angular/core";
export class NgxIntlTelInputModule {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NgxIntlTelInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: NgxIntlTelInputModule, declarations: [NgxIntlTelInputComponent], imports: [CommonModule,
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
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NgxIntlTelInputModule, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: NgxIntlTelInputModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsd0JBQXdCLElBQUksa0JBQWtCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRyxPQUFPLEVBQUMsb0JBQW9CLElBQUksY0FBYyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEYsT0FBTyxFQUFDLHFCQUFxQixJQUFJLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxxQkFBcUIsSUFBSSxlQUFlLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RixPQUFPLEVBQUMsbUJBQW1CLElBQUksYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7QUF1QnJELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUU7Z0JBQ1Qsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLHFCQUFxQjthQUN0QjtTQUNGLENBQUM7SUFDSixDQUFDOzhHQVZVLHFCQUFxQjsrR0FBckIscUJBQXFCLGlCQXBCakIsd0JBQXdCLGFBRXJDLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2QsZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsYUFBYSxhQUtMLHdCQUF3QjsrR0FFdkIscUJBQXFCLGFBTHJCO1lBQ1QscUJBQXFCO1NBQ3RCLFlBZkMsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZUFBZTtZQUNmLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixhQUFhOzsyRkFPSixxQkFBcUI7a0JBckJqQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO29CQUN4QyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4SW50bFRlbElucHV0Q29tcG9uZW50fSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge05neEludGxUZWxJbnB1dFNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbmd4LWludGwtdGVsLWlucHV0LnNlcnZpY2UnO1xyXG5pbXBvcnQge01hdExlZ2FjeUZvcm1GaWVsZE1vZHVsZSBhcyBNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1mb3JtLWZpZWxkJztcclxuaW1wb3J0IHtNYXRMZWdhY3lJbnB1dE1vZHVsZSBhcyBNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGVnYWN5LWlucHV0JztcclxuaW1wb3J0IHtNYXRMZWdhY3lCdXR0b25Nb2R1bGUgYXMgTWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktYnV0dG9uJztcclxuaW1wb3J0IHtNYXRMZWdhY3lTZWxlY3RNb2R1bGUgYXMgTWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktc2VsZWN0JztcclxuaW1wb3J0IHtNYXRMZWdhY3lNZW51TW9kdWxlIGFzIE1hdE1lbnVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1tZW51JztcclxuaW1wb3J0IHtNYXREaXZpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaXZpZGVyJztcclxuaW1wb3J0IHtDb21wb25lbnRzTW9kdWxlfSBmcm9tICcuL2NvbXBvbmVudHMvY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQge05neERyb3Bkb3duU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtZHJvcGRvd24uc2VydmljZSc7XHJcbmltcG9ydCB7U2Nyb2xsaW5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuaW1wb3J0IHtOZ3hJbnRsVGVsRm9ybVNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbmd4LWludGwtdGVsLWZvcm0uc2VydmljZSc7XHJcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW05neEludGxUZWxJbnB1dENvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBTY3JvbGxpbmdNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE5neEludGxUZWxGb3JtU2VydmljZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsSW5wdXRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4SW50bFRlbElucHV0TW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTmd4SW50bFRlbElucHV0TW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBOZ3hJbnRsVGVsSW5wdXRTZXJ2aWNlLFxyXG4gICAgICAgIE5neERyb3Bkb3duU2VydmljZSxcclxuICAgICAgICBOZ3hJbnRsVGVsRm9ybVNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19