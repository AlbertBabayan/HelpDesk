import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';
import { maxLength, minLength } from '../../../core/infrastructure/validators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public userRegInfo: FormGroup;
  private ngUnsubscribe = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userRegInfo = this.formBuilder.group({
      firstName: ['', [Validators.required], [maxLength(10)]],
      lastName: ['', [Validators.required], [maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], [minLength(10)]],
      role: ['user']
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public createUser() {
    this.authService.addUser(this.userRegInfo.value)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe({
        next: resp => {
          this.router.navigate([resp.user.role]);
        },
        error: err => {
          if (err.status === 0 || err.status === 404) {
            this.toastr.error('The requested URL was not found on this server or no internet conection');
          } else {
            const message = err && err.error && err.error.message || 'Invalid request';
            this.toastr.error(message);
          }
        }
      });
  }
}
