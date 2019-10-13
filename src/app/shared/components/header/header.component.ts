import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(private auth: AuthService) { }

	ngOnInit() {
	}

	public get isLoggedIn() {
		return this.auth.isLoggedIn;
	}

	public loginGoogle() {
		this.auth.authenticateGoogle();
	}

	public loginTwitter() {
		this.auth.authenticateTwitter();
	}

}
