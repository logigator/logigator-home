import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {BurgerMenuService} from '../../services/burger-menu/burger-menu.service';
import {PopupService} from '../../services/popup/popup.service';
import {LoginPopupComponent} from '../login-popup/login-popup.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

	public loginEmail() {
		this.popup.showPopup(LoginPopupComponent, this.componentFactoryResolver, 'Login', false);
	}

	public loginGoogle() {
		this.auth.authenticateGoogle();
	}

	public loginTwitter() {
		this.auth.authenticateTwitter();
	}

	public logout() {
		this.auth.logout();
	}

	public switchBurgerMenu() {
		this.burgerMenu.setOpen = !this.burgerMenu.getOpen;
	}

}
