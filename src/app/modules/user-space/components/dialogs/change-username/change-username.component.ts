import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {PopupContentComp, AccountActionErrorResolverService} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-username.component.html',
	styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent extends PopupContentComp implements OnInit {

	public newUsernameForm: FormGroup;

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
		this.newUsernameForm = this.formBuilder.group({
			username: ['', [
				Validators.required, Validators.minLength(2), Validators.maxLength(20)
			]],
		});
	}

	public async submit() {
		if (this.newUsernameForm.invalid)
			return;
		try {
			await this.api.updateProfile({username: this.newUsernameForm.controls.username.value}).toPromise();
			this.showSuccessMessage = true;
		} catch (e) {
			this.errorMessage = await this.accountActionErrorResolver.getErrorMessage(e);
		}
	}

	public close() {
		this.requestClose.emit();
	}

}
