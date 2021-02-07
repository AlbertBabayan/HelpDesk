import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IUser, IRegUser, ILogined } from '../../../core/infrastructure/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }

  public static token(): string | null{
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  public get isSignedIn(): boolean {
    return AuthService.token() && this.jwtHelper.isTokenExpired(this.token);
  }

  public authentication(formData): Observable<ILogined>{
    return this.http.post<ILogined>(`${environment.serverUrl}/auth/login`, formData)
    .pipe(
      map(
        resp => {
          this.token = resp.tokens.access.token;
          return resp;
        }
      )
    );
  }

  public addUser(regForm: IUser): Observable<IRegUser|any>{
    return this.http.post<IRegUser|any>(`${environment.serverUrl}/auth/register`, regForm)
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => err.Messages) // kardal nyuter
      );
  }

  public restorePass(email: string): Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}/auth/forgot-password`, email);
  }
}
