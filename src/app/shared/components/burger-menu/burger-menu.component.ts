import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {BurgerMenuService} from '../../services/burger-menu/burger-menu.service';
import {AuthService} from '../../services/auth/auth.service';
import {ThemingService} from '../../services/theming/theming.service';
import {TranslateService} from '@ngx-translate/core';
import {LoginPopupComponent, PopupService, RegisterPopupComponent} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-burger-menu',
	templateUrl: './burger-menu.component.html',
	styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {

	public currentLang: string;

	constructor(
		private burgerMenuService: BurgerMenuService,
		private auth: AuthService,
		private popup: PopupService,
		private componentFactoryResolver: ComponentFactoryResolver,
		public theming: ThemingService,
		private translate: TranslateService
	) {
	}

	ngOnInit() {
		this.currentLang = this.translate.currentLang;
	}

	public changeTheme() {
		this.theming.toggleTheme();
	}

	public languageChange() {
		this.translate.use(this.currentLang);
	}

	public setOpen(state: boolean) {
		this.burgerMenuService.setOpen = state;
	}

	public get getOpen() {
		return this.burgerMenuService.getOpen;
	}

	public async logout() {
		await this.auth.logout();
		this.setOpen(false);
	}

	public get isLoggedIn() {
		return this.auth.isLoggedIn;
	}

	public loginEmail() {
		this.popup.showPopup(LoginPopupComponent, 'POPUP.LOGIN.TITLE', false, null, this.componentFactoryResolver);
	}

	public loginTwitter() {
		this.auth.authenticateTwitter();
	}

	public loginGoogle() {
		this.auth.authenticateGoogle();
	}

	public registerEmail() {
		this.popup.showPopup(RegisterPopupComponent, 'POPUP.REGISTER.TITLE', false, null, this.componentFactoryResolver);
	}
}
