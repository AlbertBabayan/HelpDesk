import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/services/authService';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private ngUnsubscribe = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public restore(){
    this.auth.restorePass(this.form.value.email)
    .pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (resp) => {
        this.router.navigate(['login']);
      },
      error: err => {
        this.toastr.error('Please enter valid email');
      }
    });
  }
  public iRemember() {
    this.router.navigate(['login']);
  }
}
