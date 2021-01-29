import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../../services';
import { MegaMenuItem, MenuItem} from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  public users: any;
  private forUnsubscribe = new Subject();
  public sitebarItems: MenuItem[];
  public menuItems: MegaMenuItem[];

  constructor(
    private usersService: UsersService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.sitebarItems = [
        {
        label: 'Staff',
        icon: 'pi pi-fw pi-users',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-user-plus',
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-user-minus',
            },
            {
                label: 'Search',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                    label: 'Filter',
                    icon: 'pi pi-fw pi-filter',
                    items: [
                        {
                            label: 'Print',
                            icon: 'pi pi-fw pi-print'
                        }
                    ]
                    },
                    {
                    icon: 'pi pi-fw pi-bars',
                    label: 'List'
                    }
                ]
            }
        ]
        },
        {
        label: 'Tickets',
        icon: 'pi pi-fw pi-ticket',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                    label: 'Bookmark',
                    icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                    label: 'Video',
                    icon: 'pi pi-fw pi-video'
                    }
                ]
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
        },
        {
        label: 'Configuration',
        icon: 'pi pi-fw pi-cog',
        items: [
            {
                label: 'Left',
                icon: 'pi pi-fw pi-align-left'
            },
            {
                label: 'Right',
                icon: 'pi pi-fw pi-align-right'
            },
            {
                label: 'Center',
                icon: 'pi pi-fw pi-align-center'
            },
            {
                label: 'Justify',
                icon: 'pi pi-fw pi-align-justify'
            }
        ]
        }
    ];
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

  public getUsers(){
    this.usersService.getUsers(10, 0)
    .pipe(
      takeUntil(this.forUnsubscribe)
    ).subscribe(
      resp => {
        this.users = resp;
      }
    );
  }

  public logout(){
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      this.router.navigate(['login']);
  }
}
