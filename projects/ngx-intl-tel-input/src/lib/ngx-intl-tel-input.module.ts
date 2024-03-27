import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from './components/components.module';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
import { NgxDropdownService } from './services/ngx-dropdown.service';
import { NgxIntlTelFormService } from './services/ngx-intl-tel-form.service';
import { NgxIntlTelInputService } from './services/ngx-intl-tel-input.service';

@NgModule({
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
})
export class NgxIntlTelInputModule {
  static forRoot(): ModuleWithProviders<NgxIntlTelInputModule> {
    return {
      ngModule: NgxIntlTelInputModule,
      providers: [
        NgxIntlTelInputService,
        NgxDropdownService,
        NgxIntlTelFormService
      ]
    };
  }
}
