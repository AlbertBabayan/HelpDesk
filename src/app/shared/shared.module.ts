import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MegaMenuModule } from 'primeng/megamenu';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    MegaMenuModule
  ],
  exports: [
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    NavbarComponent,
    SidebarComponent
  ],
  providers: []
})
export class SharedModule { }
