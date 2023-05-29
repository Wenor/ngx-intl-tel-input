import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { NgxIntlTelCountryComponent } from './ngx-intl-tel-country/ngx-intl-tel-country.component';
import { NgxIntlTelTriggerComponent } from './ngx-intl-tel-trigger/ngx-intl-tel-trigger.component';


@NgModule({
  declarations: [NgxIntlTelTriggerComponent, NgxIntlTelCountryComponent],
  exports: [
    NgxIntlTelTriggerComponent,
    NgxIntlTelCountryComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class ComponentsModule {
}
