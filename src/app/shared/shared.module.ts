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

import { NavbarComponent, SidebarComponent, UserAccountComponent } from './components';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    UserAccountComponent
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
    SidebarComponent,
    UserAccountComponent
  ],
  providers: []
})
export class SharedModule { }
