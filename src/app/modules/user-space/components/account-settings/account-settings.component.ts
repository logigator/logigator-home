import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {PopupService} from '../../../../shared/services/popup/popup.service';
import {ChangePasswordComponent} from './popups/change-password/change-password.component';
import {ApiService} from '../../../../shared/services/api/api.service';
import {ChangeUsernameComponent} from './popups/change-username/change-username.component';
import {ChangePictureComponent} from './popups/change-picture/change-picture.component';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private popup: PopupService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private api: ApiService
	) { }

	ngOnInit() {
	}

	public get userInfo$(): Observable<UserInfo> {
		return this.auth.userInfo$;
	}

	public openPasswordChangeDialog() {
		this.popup.showPopup(ChangePasswordComponent, this.componentFactoryResolver, 'Change Password', false);
	}

	public openUsernameChangeDialog() {
		this.popup.showPopup(ChangeUsernameComponent, this.componentFactoryResolver, 'Change Username', false);
	}

	public openPictureChangeDialog() {
		this.popup.showPopup(ChangePictureComponent, this.componentFactoryResolver, 'Change Profile Picture', false);
	}

	public async submitSettings() {
		/*const promises: Promise<any>[] = [];

		if (this.changeProfileForm.controls.profilePicture.touched) {
			promises.push(this.api.changeProfilePicture(this.changeProfileForm.controls.profilePicture.value).toPromise());
		}

		await Promise.all(promises);
		this.changeProfileForm.controls.profilePicture.setValue(this.changeProfileForm.controls.profilePicture.value);*/
	}
}
