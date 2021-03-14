import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUser } from '../../../core/infrastructure/interfaces';
import { LoaderService, StaffService } from '../../services';

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
    private loaderSvc: LoaderService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getUsers() {
    this.loaderSvc.subject.next(true);
    this.staffService.getAllUsers(1, this.pageSize)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.loaderSvc.subject.next(false);
          this.users = resp;
        },
        error: err => {
          this.loaderSvc.subject.next(false);
        }
      });
  }

  public deleteUser(id: string) {
    this.staffService.deleteUser(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.users = resp;
        },
        error: err => {
        }
      });
  }
}
