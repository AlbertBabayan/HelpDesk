import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModule } from '../../user.module';


@Injectable({
  providedIn: UserModule
})

export class UserService {

  constructor(
    private http: HttpClient
    ) { }
}
