import {NgModule, ModuleWithProviders} from '@angular/core';
import {NgxIntlTelInputComponent} from './ngx-intl-tel-input.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxIntlTelInputService} from './services/ngx-intl-tel-input.service';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatDividerModule} from '@angular/material/divider';
import {ComponentsModule} from './components/components.module';
import {NgxDropdownService} from './services/ngx-dropdown.service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgxIntlTelFormService} from './services/ngx-intl-tel-form.service';
import {MatIconModule} from '@angular/material/icon';

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
