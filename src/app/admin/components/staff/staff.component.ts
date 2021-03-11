import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUser } from '../../../core/infrastructure/interfaces';
import { StaffService } from '../../services';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {

  public users: IUser[];
  public pageSize = 10;
  private ngUnsubscribe = new Subject();

  constructor(
    private staffService: StaffService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getUsers() {
    this.staffService.getAllUsers(1, this.pageSize)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.users = resp;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  public deleteUser(id: string) {
    this.users = this.users.filter(
      (user) => user.id !== id
    );
  }
}
