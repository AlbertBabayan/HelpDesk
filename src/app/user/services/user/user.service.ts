import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class UserService {

  constructor(
    private http: HttpClient
    ) { }
}
