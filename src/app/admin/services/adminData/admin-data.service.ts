import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IColumn, ITicketDescription, IUpdateConfig } from 'src/app/core/infrastructure/interfaces';

@Injectable()

export class AdminDataService {

  constructor(private http: HttpClient) { }

  public getConfigs(): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`${environment.serverUrl}/configs?type=column`);
  }

  public updateConfig(columns: Partial<IColumn[]>): Observable<IUpdateConfig> {
    return this.http.post<IUpdateConfig>(`${environment.serverUrl}/configs?type=column`, columns);
  }

  public getTickets(): Observable<ITicketDescription[]>{
    return this.http.get<ITicketDescription[]>(`${environment.serverUrl}/configs?type=ticket`);
  }

  public updateTicket(tickets: Partial<ITicketDescription[]>): Observable<IUpdateConfig> {
    return this.http.post<IUpdateConfig>(`${environment.serverUrl}/configs?type=ticket`, tickets);
  }
}
