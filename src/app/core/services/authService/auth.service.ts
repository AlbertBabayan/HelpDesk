import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { IRegUser, ILogined, ILogin, IRestore } from '../../../core/infrastructure/interfaces';

@Injectable()

export class AuthService {

  public token: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  public static getToken(): string | null{
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  public get isSignedIn(): boolean {
    return AuthService.getToken() && !this.jwtHelper.isTokenExpired(this.token);
  }

  public authentication(formData: ILogin, rememberMe: boolean): Observable<ILogined>{
    return this.http.post<ILogined>(`${environment.serverUrl}/auth/login`, formData)
    .pipe(
      map(
        resp => {
          this.token = resp.tokens.access.token;
          if (rememberMe) {
            localStorage.setItem('authToken', this.token);
          } else {
            sessionStorage.setItem('authToken', this.token);
          }
          return resp;
        }
      )
    );
  }

  public addUser(regForm: IRegUser): Observable<ILogined>{
    return this.http.post<ILogined>(`${environment.serverUrl}/auth/register`, regForm)
      .pipe(
        map(
          resp => {
            this.token = resp.tokens.access.token;
            sessionStorage.setItem('authToken', this.token);
            return resp;
          }
        ),
      );
  }

  public restorePass(email: string): Observable<IRestore>{
    return this.http.post<IRestore>(`${environment.serverUrl}/auth/forgot-password`, email);
  }
}
