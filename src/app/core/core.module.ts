import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { AuthService } from './services';
import { ActivatePublicGuard } from './guards';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: [environment.serverDomain],
        disallowedRoutes: [
          `${environment.serverUrl}/auth/login`,
          `${environment.serverUrl}/auth/register`,
          `${environment.serverUrl}/auth/forgot-password`
        ],
        tokenGetter: AuthService.getToken,
        skipWhenExpired: true,
        throwNoTokenError: true
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    ActivatePublicGuard
  ]
})
export class CoreModule { }
