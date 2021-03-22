import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { IUser } from 'src/app/core/infrastructure/interfaces';
import { maxLength } from 'src/app/core/infrastructure/validators';
import { AuthService } from 'src/app/core/services';
import { LoaderService } from 'src/app/admin/services';

@Component({
	selector: 'app-user-account',
	templateUrl: './user-account.component.html',
	styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit, OnDestroy {

	public user: IUser;
	public accountForm: FormGroup;
	private ngUnsubscribe = new Subject();

	constructor(
		private auth: AuthService,
		private bulder: FormBuilder,
		private toastrService: ToastrService,
		private loaderSvc: LoaderService
	) {
	}

	ngOnInit(): void {
		this.formInit();
		this.getUser();
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.unsubscribe();
	}

	public formInit() {
		this.accountForm = this.bulder.group({
			firsName: ['', [Validators.required], [maxLength(10)]],
			lastName: ['', [Validators.required], [maxLength(12)]],
			email: ['', [Validators.required, Validators.email]]
		})
	}

	public getUser() {
		this.loaderSvc.subject.next(true);
		this.auth.getUser()
			.pipe(
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe({
				next: resp => {
					this.loaderSvc.subject.next(false);
					this.user = resp;
				},
				error: err => {
					this.loaderSvc.subject.next(false);
				}
			})
	}

	public update() {
		this.auth.updateUser(this.accountForm.value)
			.pipe(
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe({
				next: resp => {
					this.toastrService.info('Your changes have been updated !')
				},
				error: err => {
					if (err.status === 0 || err.status === 404) {
						this.toastrService.error('The requested URL was not found on this server or no internet conection');
					} else {
						const message = err && err.error && err.error.message || 'Invalid request';
						this.toastrService.error(message);
					}
				}
			})
	}

}
