import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { PaginatorModule } from 'primeng/paginator';

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
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    MegaMenuModule,
    PaginatorModule
  ],
  exports: [
    ReactiveFormsModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    PaginatorModule,
    NavbarComponent,
    SidebarComponent
  ],
  providers: []
})
export class SharedModule { }
