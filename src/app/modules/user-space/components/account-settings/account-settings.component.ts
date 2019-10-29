import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {PopupService} from '../../../../shared/services/popup/popup.service';
import {ChangePasswordComponent} from './popups/change-password/change-password.component';
import {ApiService} from '../../../../shared/services/api/api.service';
import {ChangeUsernameComponent} from './popups/change-username/change-username.component';
import {ChangePictureComponent} from './popups/change-picture/change-picture.component';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {ChangeEmailComponent} from './popups/change-email/change-email.component';
import {environment} from '../../../../../environments/environment';

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

	public openEmailChangeDialog() {
		this.popup.showPopup(ChangeEmailComponent, this.componentFactoryResolver, 'Change Email', false);
	}

	public openPictureChangeDialog() {
		this.userInfo$.pipe(
			map(data => data.user.profile_image),
			take(1)
		).subscribe(img => {
			this.popup.showPopup(ChangePictureComponent, this.componentFactoryResolver, 'Change Profile Picture', false, img);
		});
	}
}
