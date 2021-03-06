import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdminDataService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

  constructor(
    private adminData: AdminDataService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
