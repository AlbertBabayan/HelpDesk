import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'admin',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // data: { preload: true }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
