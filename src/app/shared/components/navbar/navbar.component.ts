import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { SidebarComponent } from '../sidebar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public menuItem: MegaMenuItem[];

  constructor(

    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuItem = [
      {
        label: 'Settings', icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              items: [{ label: 'Account' }, { label: 'Logout', command: this.logout.bind(this) }]
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
}
