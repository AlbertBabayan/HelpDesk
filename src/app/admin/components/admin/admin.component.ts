import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AdminDataService } from '../../services';
import { IUser } from '../../../core/infrastructure/interfaces';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

  public users: IUser[];
  private ngUnsubscribe = new Subject();

  constructor(
    private adminData: AdminDataService,
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

  public deleteUser(id: string){
    this.users = this.users.filter(
      (user) => user.id !== id
    );
  }
}
