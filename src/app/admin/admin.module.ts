import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './components/admin/admin.component';
import { AdminDataService, LoaderService, StaffService } from './services';
import { StaffComponent, TicketsComponent, ConfigComponent, TicketColumnsComponent, TicketFormComponent } from './components';

@NgModule({
  declarations: [
    AdminComponent,
    StaffComponent,
    TicketsComponent,
    ConfigComponent,
    TicketColumnsComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    AdminDataService,
    StaffService,
    LoaderService
  ],
})
export class AdminModule { }
