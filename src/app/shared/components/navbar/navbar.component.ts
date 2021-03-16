import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MegaMenuItem } from 'primeng/api';
import { StaffService } from 'src/app/admin/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public menuItem: MegaMenuItem[];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private staffSVC: StaffService
  ) { }

  ngOnInit(): void {
    this.menuItem = [
      {
        label: 'Settings', icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              items: [{ label: 'Account', command: this.account.bind(this) }, { label: 'Logout', command: this.logout.bind(this) }]
            },
          ],
        ]
      }
    ];
  }

  public logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }

  public account() {
    this.router.navigate(['account', this.staffSVC.userId], { relativeTo: this.activeRoute });
  }
}
