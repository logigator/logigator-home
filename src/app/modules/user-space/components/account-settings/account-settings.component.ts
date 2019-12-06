import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {map, take} from 'rxjs/operators';
import {ChangePasswordComponent} from '../dialogs/change-password/change-password.component';
import {ChangeUsernameComponent} from '../dialogs/change-username/change-username.component';
import {ChangeEmailComponent} from '../dialogs/change-email/change-email.component';
import {ChangePictureComponent} from '../dialogs/change-picture/change-picture.component';
import {PopupService} from '@logigator/logigator-shared-comps';

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
	) { }

	ngOnInit() {
	}

	public get userInfo$(): Observable<UserInfo> {
		return this.auth.userInfo$;
	}

	public openPasswordChangeDialog() {
		this.popup.showPopup(ChangePasswordComponent, 'POPUP.CHANGE_PASSWORD.TITLE', false, null, this.componentFactoryResolver);
	}

	public openUsernameChangeDialog() {
		this.popup.showPopup(ChangeUsernameComponent, 'POPUP.CHANGE_USERNAME.TITLE', false, null, this.componentFactoryResolver);
	}

	public openEmailChangeDialog() {
		this.popup.showPopup(ChangeEmailComponent, 'POPUP.CHANGE_EMAIL.TITLE', false, null, this.componentFactoryResolver);
	}

	public openPictureChangeDialog() {
		this.userInfo$.pipe(
			map(data => data.user.profile_image),
			take(1)
		).subscribe(img => {
			this.popup.showPopup(ChangePictureComponent, 'POPUP.CHANGE_PICTURE.TITLE', false, img, this.componentFactoryResolver);
		});
	}
}
