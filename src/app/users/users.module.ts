import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared';

import { UsersComponent } from './comonents/users/users.component';
import { UsersService } from './services';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MegaMenuModule,
    PanelMenuModule
  ],
  exports: [
    MegaMenuModule,
    PanelMenuModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
