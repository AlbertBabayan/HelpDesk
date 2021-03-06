import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

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
  private ngUnsubscribe = new Subject();

  constructor(
    private staffService: StaffService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getUsers(){
    this.staffService.getAllUsers(1, 10)
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

  public deleteUser(id: string){
    this.users = this.users.filter(
      (user) => user.id !== id
    );
  }
}
