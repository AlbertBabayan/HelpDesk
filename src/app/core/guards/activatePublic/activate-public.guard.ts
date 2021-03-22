import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class ActivatePublicGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isSignedIn) {
      this.router.navigate([this.auth.loginedUser.user.role]);
      return false;
    }
    return true;
  }
}
