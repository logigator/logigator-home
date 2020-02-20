import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {BurgerMenuService} from '../../services/burger-menu/burger-menu.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../models/http-responses/user-info';
import {LoginPopupComponent, PopupService, RegisterPopupComponent} from '@logigator/logigator-shared-comps';
import {ApiService} from '../../services/api/api.service';

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
		private componentFactoryResolver: ComponentFactoryResolver,
		private api: ApiService
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
		this.popup.showPopup(LoginPopupComponent, 'POPUP.LOGIN.TITLE', false, null, this.componentFactoryResolver);
	}

	public registerEmail() {
		this.popup.showPopup(RegisterPopupComponent, 'POPUP.REGISTER.TITLE', false, null, this.componentFactoryResolver);
	}

	public logout() {
		this.auth.logout();
		this.api.reset();
	}

	public switchBurgerMenu() {
		this.burgerMenu.setOpen = !this.burgerMenu.getOpen;
	}

}
