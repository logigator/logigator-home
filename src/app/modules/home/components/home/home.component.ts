import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private auth: AuthService) { }

	ngOnInit() {
	}

	public loginGoogle() {
		this.auth.authenticateGoogle();
	}

	public loginTwitter() {
		this.auth.authenticateTwitter();
	}
}
