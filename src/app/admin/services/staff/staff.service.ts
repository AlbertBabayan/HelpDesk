import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IUser } from 'src/app/core/infrastructure/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()

export class StaffService {

  constructor(
    private http: HttpClient
  ) { }
  public deleteUser(id: string): Observable<IUser[]>{
    return this.http.delete<any>(`${environment.serverUrl}/users/:${id}`);
  }
}
