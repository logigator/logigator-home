import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {PopupContentComp, AccountActionErrorResolverService} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-email.component.html',
	styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends PopupContentComp implements OnInit {

	public newMailForm: FormGroup;

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
		this.newMailForm = this.formBuilder.group({
			email: ['', [
				Validators.required,
				Validators.email
			]]
		});
	}

	public async submit() {
		if (this.newMailForm.invalid)
			return;
		try {
			await this.api.updateProfile({email: this.newMailForm.controls.email.value}).toPromise();
			this.showSuccessMessage = true;
		} catch (e) {
			this.errorMessage = await this.accountActionErrorResolver.getErrorMessage(e);
		}
	}

	public close() {
		this.requestClose.emit();
	}

}
