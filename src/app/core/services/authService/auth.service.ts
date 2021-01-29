import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return !!AuthService.token();
  }

  public authentication(formData): Observable<ILogined>{
    return this.http.post<ILogined>(`${environment.serverUrl}/auth/login`, formData)
    .pipe(
      map(
        resp => {
          this.token = this.jwtHelper.decodeToken(resp.tokens.access.token);
          return resp;
        }
      )
    );
  }

  public addUser(regForm: IUser): Observable<IRegUser>{
    return this.http.post<IRegUser>(`${environment.serverUrl}/auth/register`, regForm)
    .pipe(
      map(
        resp => {
          return resp;
        }
      )
    );
  }

  public restorePass(email: string): Observable<any>{
    return this.http.post<any>(`${environment.serverUrl}/auth/forgot-password`, email);
  }
}
