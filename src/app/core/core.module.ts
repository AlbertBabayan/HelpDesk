import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getToken,
        allowedDomains: [`${environment.serverUrl}`],
        disallowedRoutes: [],
        throwNoTokenError: true,
        skipWhenExpired: true
      }
    }),
    ToastrModule.forRoot()
  ]
})
export class CoreModule { }
