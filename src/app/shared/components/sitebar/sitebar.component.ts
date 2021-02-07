import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sitebar',
  templateUrl: './sitebar.component.html',
  styleUrls: ['./sitebar.component.scss']
})
export class SitebarComponent implements OnInit {

  public sitebarItems: MenuItem[];

  constructor() { }

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
  }

}
