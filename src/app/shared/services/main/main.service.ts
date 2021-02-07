import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(limit: number, page: number): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/users?limit=${limit}&page=${page}`);
  }
}
