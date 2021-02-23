import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IUser } from '../../../core/infrastructure/interfaces';

@Injectable()

export class AdminDataService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllUsers(page: number, limit: number): Observable<IUser[]>{
    return this.http.get<any>(`${environment.serverUrl}/users?page=${page}&limit=${limit}`);
  }

}
