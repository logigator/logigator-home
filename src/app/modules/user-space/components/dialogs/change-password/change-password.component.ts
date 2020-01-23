import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {AccountActionErrorResolverService, PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends PopupContentComp implements OnInit {

	public newPasswordForm: FormGroup;

	public errorMessage = '';
	public showSuccessMessage = false;

	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService,
		private accountActionErrorResolver: AccountActionErrorResolverService
	) {
		super();
	}

	ngOnInit() {
		this.newPasswordForm = this.formBuilder.group({
			password: ['', [
				Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9]).*$')
			]],
			confirm_password: ['', [
				Validators.required
			]]
		}, {
			validators: ((x: FormGroup) => {
				return (x.controls.password.value !== x.controls.confirm_password.value) ? {passwordMatch: {value: x.controls.password.value}} : null;
			})
		});
	}

	public async submit() {
		if (this.newPasswordForm.invalid)
			return;
		try {
			await this.api.updateProfile({password: this.newPasswordForm.controls.password.value}).toPromise();
			this.showSuccessMessage = true;
		} catch (e) {
			this.errorMessage = await this.accountActionErrorResolver.getErrorMessage(e);
		}
	}

	public close() {
		this.requestClose.emit();
	}

}
