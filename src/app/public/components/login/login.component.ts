import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  private ngUnsubscribe = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService)
  {
    this.loggedIn = this.auth.isSignedIn;
    if (this.loggedIn){
      this.router.navigate(['users']);
    }
  }

  ngOnDestroy(){
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

  public login(){
    if (this.userInfoForm.invalid){
      this.toastrService.error('form is invalid', 'error');
      return;
    }
    const {email, password, rememberme: rememberMe} = this.userInfoForm.value;

    this.auth.authentication({email, password})
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(resp => {
      if (rememberMe){
        localStorage.setItem('authToken', resp.tokens.access.token);
      }else{
        sessionStorage.setItem('authToken', resp.tokens.access.token);
      }
      this.router.navigate(['users']);
    });
  }

  public forgotPassword(){
    this.router.navigate(['restore']);
  }

  public singUp(){
    this.router.navigate(['registration']);
  }
}
