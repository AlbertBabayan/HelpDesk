import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services';
import { maxLength } from '../../../core/infrastructure/validators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public userRegInfo: FormGroup;
  private forUnsubscribe = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRegInfo = this.formBuilder.group({
      firstName: ['', [Validators.required], [maxLength(8)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, maxLength(8)],
      role: ['user']
    });
  }

  ngOnDestroy(): void {
    this.forUnsubscribe.next();
    this.forUnsubscribe.unsubscribe();
  }

  public createUser() {
    this.authService.addUser(this.userRegInfo.value)
    .pipe(
      takeUntil(this.forUnsubscribe)
    ).subscribe(
      resp => {},
      err => {},
    );
  }
}
