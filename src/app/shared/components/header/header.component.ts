import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {BurgerMenuService} from '../../services/burger-menu/burger-menu.service';
import {PopupService} from '../../services/popup/popup.service';
import {LoginPopupComponent} from '../login-popup/login-popup.component';
import {RegisterPopupComponent} from '../register-popup/register-popup.component';
import {Observable} from 'rxjs';
import {UserInfo} from '../../models/http-responses/user-info';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public settingsDropdown = false;

	constructor(
		private auth: AuthService,
		private burgerMenu: BurgerMenuService,
		private popup: PopupService,
		private componentFactoryResolver: ComponentFactoryResolver
	) { }

	ngOnInit() {
	}

	public get isLoggedIn() {
		return this.auth.isLoggedIn;
	}

	public get userInfo(): Observable<UserInfo> {
		return this.auth.userInfo$;
	}

	public loginEmail() {
		this.popup.showPopup(LoginPopupComponent, this.componentFactoryResolver, 'POPUP.LOGIN.TITLE', false);
	}

	public registerEmail() {
		this.popup.showPopup(RegisterPopupComponent, this.componentFactoryResolver, 'POPUP.REGISTER.TITLE', false);
	}

	public logout() {
		this.auth.logout();
	}

	public switchBurgerMenu() {
		this.burgerMenu.setOpen = !this.burgerMenu.getOpen;
	}

}
