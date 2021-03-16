import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from 'src/app/core/infrastructure/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()

export class StaffService {

  public userId: string;

  constructor(
    private http: HttpClient
  ) { }

  public getAllUsers(page: number, limit: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.serverUrl}/users?page=${page}&limit=${limit}`);
  }

  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.serverUrl}/user/:${id}`)
      .pipe(
        map(
          resp => {
            this.userId = resp.id;
            return resp;
          }
        )
      );
  }

  public deleteUser(id: string): Observable<IUser[]> {
    return this.http.delete<IUser[]>(`${environment.serverUrl}/users/:${id}`); // ?? interface
  }
}
