import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {PopupService} from '../../../../shared/services/popup/popup.service';
import {ChangePasswordComponent} from "./popups/change-password/change-password.component";

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

	constructor(private auth: AuthService, private popup: PopupService, private componentFactoryResolver: ComponentFactoryResolver) { }

	ngOnInit() {
	}

	public get userInfo$(): Observable<UserInfo> {
		return this.auth.userInfo$;
	}

	public openPasswordChangeDialog() {
		this.popup.showPopup(ChangePasswordComponent, this.componentFactoryResolver, 'Change Password', true);
	}
}
