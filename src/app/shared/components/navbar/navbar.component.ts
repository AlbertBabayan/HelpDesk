import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public menuItems: MegaMenuItem[];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      {
          label: 'Messages', icon: 'pi pi-fw pi-envelope',
          items: [
              [
                  {
                      items: [{label: 'Messages 1.1'}, {label: 'Messages 1.2'}]
                  }
              ]
          ]
      },
      {
          label: 'Users', icon: 'pi pi-fw pi-user',
          items: [
              [
                  {
                      items: [{label: 'User 1'}, {label: 'User 2'}]
                  }
              ]
          ]
      },
      {
          label: 'Events', icon: 'pi pi-fw pi-calendar',
          items: [
              [
                  {
                      items: [{label: 'Event 1'}, {label: 'Event 2'}]
                  }
              ]
          ]
      },
      {
          label: 'Settings', icon: 'pi pi-fw pi-cog',
          items: [
              [
                  {
                      items: [{label: 'Personal cart'}, {label: 'Logout', command: this.logout.bind(this)}]
                  },
              ],
          ]
      }
  ];
  }

  public logout(){
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
}
