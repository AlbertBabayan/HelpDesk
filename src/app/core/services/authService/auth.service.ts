import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { IRegUser, ILogined, ILogin, IRestore, IUser } from '../../../core/infrastructure/interfaces';

@Injectable()

export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  public static getToken(): string | null {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  public get userId() {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
  }
  public get userRole() {
    return localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
  }

  public remove() {
    if (AuthService.getToken) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userRole');
    }
  }

  public getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.serverUrl}/user/${this.userId}`);
  }

  public get isSignedIn(): boolean {
    return AuthService.getToken() && !this.jwtHelper.isTokenExpired(AuthService.getToken());
  }

  public authentication(formData: ILogin, rememberMe: boolean): Observable<ILogined> {
    return this.http.post<ILogined>(`${environment.serverUrl}/auth/login`, formData)
      .pipe(
        map(
          resp => {
            if (rememberMe) {
              localStorage.setItem('authToken', resp.tokens.access.token);
              localStorage.setItem('userId', resp.user.id);
              localStorage.setItem('userRole', resp.user.role);
            } else {
              sessionStorage.setItem('authToken', resp.tokens.access.token);
              sessionStorage.setItem('userId', resp.user.id);
              sessionStorage.setItem('userRole', resp.user.role);
            }
            return resp;
          }
        )
      );
  }

  public addUser(regForm: IRegUser): Observable<ILogined> {
    return this.http.post<ILogined>(`${environment.serverUrl}/auth/register`, regForm)
      .pipe(
        map(
          resp => {
            this.remove();
            sessionStorage.setItem('userId', resp.user.id);
            sessionStorage.setItem('authToken', resp.tokens.access.token);
            sessionStorage.setItem('userRole', resp.user.role);
            return resp;
          }
        ),
      );
  }
  public updateUser(updateForm: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${environment.serverUrl}/users/${this.userId}`, updateForm);
  }

  public restorePass(email: string): Observable<IRestore> {
    return this.http.post<IRestore>(`${environment.serverUrl}/auth/forgot-password`, email);
  }
}
