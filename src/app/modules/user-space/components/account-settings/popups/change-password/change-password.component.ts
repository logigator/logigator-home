import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../../shared/services/api/api.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
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
		if (this.newCompForm.invalid)
			return;
		await this.api.updateProfile({ password: this.newCompForm.controls.password.value }).toPromise();
		this.requestClose.emit();
	}

}
