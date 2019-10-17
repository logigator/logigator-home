import { Component, OnInit } from '@angular/core';
import {BurgerMenuService} from '../../services/burger-menu/burger-menu.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
	selector: 'app-burger-menu',
	templateUrl: './burger-menu.component.html',
	styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {

	constructor(private burgerMenuService: BurgerMenuService, private auth: AuthService) {
	}

	ngOnInit() {
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

	public loginTwitter() {
		this.auth.authenticateTwitter();
	}

	public loginGoogle() {
		this.auth.authenticateGoogle();
	}
}
