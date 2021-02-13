import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';

import { MainService } from './services';

import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SitebarComponent } from './components/sitebar/sitebar.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SitebarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    MegaMenuModule,
    PanelMenuModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    NavbarComponent,
    SitebarComponent
  ],
  providers: [
    MainService
  ]
})
export class SharedModule { }
