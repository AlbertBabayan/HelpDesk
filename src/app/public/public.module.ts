import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, RegistrationComponent, RestoreComponent } from './components';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    RestoreComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }
