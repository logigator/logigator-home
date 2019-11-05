import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopupContentComp} from '../popup/popup-content-comp';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-register-popup',
	templateUrl: './register-popup.component.html',
	styleUrls: ['./register-popup.component.scss']
})
export class RegisterPopupComponent extends PopupContentComp implements OnInit {

	public registerForm: FormGroup;
	public errorMessage = '';

	constructor(private formBuilder: FormBuilder, private auth: AuthService,  private router: Router) {
		super();
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: ['', [
				Validators.required, Validators.email
			]],
			password: ['', [
				Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9]).*$')
			]],
			confirm_password: ['', [
				Validators.required
			]],
			username: ['', [
				Validators.required, Validators.minLength(2), Validators.maxLength(20)
			]],
		}, {
			validators: ((x: FormGroup) => {
				return (x.controls.password.value !== x.controls.confirm_password.value) ? {passwordMatch: {value: x.controls.password.value}} : null;
			})
		});
	}

	public async submit() {
		if (this.registerForm.invalid)
			return;
		// tslint:disable-next-line:max-line-length
		this.auth.registerEmail(this.registerForm.controls.username.value, this.registerForm.controls.email.value, this.registerForm.controls.password.value).then(() => {
			this.requestClose.emit();
		}).catch(e => {
			switch (e.status) {
				case 401:
					this.errorMessage = 'Incorrect email or password.';
					break;
				default:
					this.errorMessage = 'We\'re sorry, an unknown error occurred while trying to log you in. :(';
					break;
			}
		});
		await this.router.navigate(['my']);
	}

	public async loginGoogle() {
		await this.auth.authenticateGoogle();
		this.requestClose.emit();
		await this.router.navigate(['my']);
	}

	public async loginTwitter() {
		await this.auth.authenticateTwitter();
		this.requestClose.emit();
		await this.router.navigate(['my']);
	}

}
