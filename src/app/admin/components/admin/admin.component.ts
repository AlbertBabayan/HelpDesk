import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AdminDataService, LoaderService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

  public showSpinner: boolean;
  private ngUnsubscribe = new Subject();

  constructor(
    private adminData: AdminDataService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.showLoading();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public showLoading() {
    this.loader.subject
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        resp => {
          setTimeout(() => {
            this.showSpinner = resp;
          });
        }
      );
  }

}
