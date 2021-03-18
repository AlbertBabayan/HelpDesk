import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { ILogined } from '../../../core/infrastructure/interfaces';
import { maxLength } from '../../../core/infrastructure/validators';
import { AuthService } from '../../../core/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public userInfoForm: FormGroup;
  public loggedIn: boolean;
  public loginedUserInfo: ILogined;
  private ngUnsubscribe = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.loggedIn = this.auth.isSignedIn;
    if (this.loggedIn) {
      this.router.navigate([this.auth.userId]); // toDo: admin || user
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.userInfoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], [maxLength(10)]],
      rememberme: ['']
    }
    );
  }

  public login() {
    const { email, password, rememberme: rememberMe } = this.userInfoForm.value;

    this.auth.authentication({ email, password }, rememberMe)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.loginedUserInfo = resp;
          this.router.navigate(['admin']);
        },
        error: err => {
          if (err.status === 0 || err.status === 404) {
            this.toastrService.error('The requested URL was not found on this server or no internet conection');
          } else {
            const message = err && err.error && err.error.message || 'Invalid request';
            this.toastrService.error(message);
          }
        }
      });
  }

  public forgotPassword() {
    this.router.navigate(['restore']);
  }

  public singUp() {
    this.router.navigate(['registration']);
  }
}
