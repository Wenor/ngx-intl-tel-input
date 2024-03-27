import { NgModule } from '@angular/core';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputService } from './services/ngx-intl-tel-input.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7QUF1QnJELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUU7Z0JBQ1Qsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLHFCQUFxQjthQUN0QjtTQUNGLENBQUM7SUFDSixDQUFDOzhHQVZVLHFCQUFxQjsrR0FBckIscUJBQXFCLGlCQXBCakIsd0JBQXdCLGFBRXJDLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2QsZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsYUFBYSxhQUtMLHdCQUF3QjsrR0FFdkIscUJBQXFCLGFBTHJCO1lBQ1QscUJBQXFCO1NBQ3RCLFlBZkMsWUFBWTtZQUNaLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZUFBZTtZQUNmLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixhQUFhOzsyRkFPSixxQkFBcUI7a0JBckJqQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO29CQUN4QyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4SW50bFRlbElucHV0Q29tcG9uZW50fSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge05neEludGxUZWxJbnB1dFNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbmd4LWludGwtdGVsLWlucHV0LnNlcnZpY2UnO1xyXG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XHJcbmltcG9ydCB7TWF0SW5wdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcclxuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xyXG5pbXBvcnQge01hdE1lbnVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xyXG5pbXBvcnQge01hdERpdmlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpdmlkZXInO1xyXG5pbXBvcnQge0NvbXBvbmVudHNNb2R1bGV9IGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7Tmd4RHJvcGRvd25TZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2VzL25neC1kcm9wZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHtTY3JvbGxpbmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5pbXBvcnQge05neEludGxUZWxGb3JtU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtZm9ybS5zZXJ2aWNlJztcclxuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4SW50bFRlbElucHV0Q29tcG9uZW50XSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdE1lbnVNb2R1bGUsXHJcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgQ29tcG9uZW50c01vZHVsZSxcclxuICAgIFNjcm9sbGluZ01vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTmd4SW50bFRlbEZvcm1TZXJ2aWNlLFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW05neEludGxUZWxJbnB1dENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEludGxUZWxJbnB1dE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hJbnRsVGVsSW5wdXRNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hJbnRsVGVsSW5wdXRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIE5neEludGxUZWxJbnB1dFNlcnZpY2UsXHJcbiAgICAgICAgTmd4RHJvcGRvd25TZXJ2aWNlLFxyXG4gICAgICAgIE5neEludGxUZWxGb3JtU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=