import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class ActivatePublicGuard implements CanActivate {
  constructor(
    private auth: AuthService
  ){}
  canActivate(): boolean {
    return !this.auth.isSignedIn;
  }
}
