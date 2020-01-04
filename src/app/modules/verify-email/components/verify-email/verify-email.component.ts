import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth/auth.service';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

	private success = false;
	private loading = true;

	constructor(
		private auth: AuthService,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.auth.verifyEmail(this.activatedRoute.snapshot.paramMap.get('token')).then(() => {
			this.success = true;
			this.loading = false;
		}).catch(e => {
			this.success = false;
			this.loading = false;
		});
	}

}
