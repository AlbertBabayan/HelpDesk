import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../app/shared/shared.module';

import { UserComponent } from './components/user/user.component';


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
  providers: []
})
export class UserModule { }
