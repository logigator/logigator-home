import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {PopupService} from '../../../../shared/services/popup/popup.service';
import {ChangePasswordComponent} from './popups/change-password/change-password.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

	public changeProfileForm: FormGroup;

	public testvar = '';

	constructor(
		private auth: AuthService,
		private popup: PopupService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.changeProfileForm = this.formBuilder.group({
			profilePicture: ['', [
			]]
		});
	}

	public get userInfo$(): Observable<UserInfo> {
		return this.auth.userInfo$;
	}

	public openPasswordChangeDialog() {
		this.popup.showPopup(ChangePasswordComponent, this.componentFactoryResolver, 'Change Password', false);
	}

	public submitSettings() {
		console.log(this.changeProfileForm);
	}

	public testChange(event: File) {
		const reader = new FileReader();
		reader.onload = (e: any) => { this.testvar = e.target.result; };
		reader.readAsDataURL(event);
	}
}
