import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
