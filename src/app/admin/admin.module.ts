import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './components/admin/admin.component';
import { AdminDataService, StaffService } from './services';
import { StaffComponent, TicketsComponent, ConfigComponent } from './components';

@NgModule({
  declarations: [
    AdminComponent,
    StaffComponent,
    TicketsComponent,
    ConfigComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    AdminDataService,
    StaffService
  ],
})
export class AdminModule { }
