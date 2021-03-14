import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class LoaderService {

  public subject: Subject<boolean> = new Subject();

  constructor() { }
}
