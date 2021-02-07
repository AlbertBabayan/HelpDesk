import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../app/shared/shared.module';

import { UserComponent } from './comonents/user/user.component';
import { UserService } from './services';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
