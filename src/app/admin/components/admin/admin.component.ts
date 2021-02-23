import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AdminDataService } from '../../services';
import { IUser } from '../../../core/infrastructure/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

  public users: IUser[];
  private ngUnsubscribe = new Subject();

  constructor(
    private adminData: AdminDataService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getUsers(){
    this.adminData.getAllUsers(1, 2)
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(
      resp => {
        this.users = resp;
      }
    );
  }
}
