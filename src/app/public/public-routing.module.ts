import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivatePublicGuard } from '../core/guards';
import { LoginComponent, RegistrationComponent } from './components';
import { RestoreComponent } from './components/restore/restore.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ActivatePublicGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'restore', component: RestoreComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
