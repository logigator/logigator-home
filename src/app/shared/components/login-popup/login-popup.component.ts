import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {PopupContentComp} from '../popup/popup-content-comp';
import {AuthService} from '../../services/auth/auth.service';

@Component({
	selector: 'app-login-popup',
	templateUrl: './login-popup.component.html',
	styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;
	public errorMessage = '';

	constructor(private formBuilder: FormBuilder, private auth: AuthService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			user: ['', [
				Validators.required
			]],
			password: ['', [
				Validators.required
			]]
		});
	}

	public async submit() {
		if (this.newCompForm.invalid)
			return;
		this.auth.loginEmail(this.newCompForm.controls.user.value, this.newCompForm.controls.password.value).then(() => {
			this.requestClose.emit();
		}).catch(e => {
			switch (e.status) {
				case 401:
					this.errorMessage = 'Incorrect username or password.';
					break;
				default:
					this.errorMessage = 'We\'re sorry, an unknown error occurred while trying to log you in. :(';
					break;
			}
		});
	}

	public loginGoogle() {
		this.auth.authenticateGoogle();
	}

	public loginTwitter() {
		this.auth.authenticateTwitter();
	}

}
