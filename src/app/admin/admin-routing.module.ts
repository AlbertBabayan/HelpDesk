import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAccountComponent } from '../shared/components';
import { AdminComponent, StaffComponent, TicketsComponent, ConfigComponent } from './components';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'staff', component: StaffComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'account', component: UserAccountComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
