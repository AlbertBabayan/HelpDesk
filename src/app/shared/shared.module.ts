import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

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
    PaginatorModule,
    TabViewModule,
    DialogModule,
    DragDropModule,
    TooltipModule
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
    UserAccountComponent,
    TabViewModule,
    DialogModule,
    DragDropModule,
    TooltipModule
  ],
  providers: []
})
export class SharedModule { }
