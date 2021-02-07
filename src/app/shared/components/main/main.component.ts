import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MainService } from '../../services';

import { MegaMenuItem, MenuItem} from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public users: any;
  private forUnsubscribe = new Subject();

  constructor(
    private mainService: MainService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.forUnsubscribe.next();
    this.forUnsubscribe.unsubscribe();
  }

  public getUsers(){                      // for content pagination
    this.mainService.getUsers(10, 0)
    .pipe(
      takeUntil(this.forUnsubscribe)
    ).subscribe(
      resp => {
        this.users = resp;
      }
    );
  }
}
