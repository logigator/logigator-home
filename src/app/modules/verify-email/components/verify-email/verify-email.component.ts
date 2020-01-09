import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

	public success = false;
	public loading = true;

	constructor(
		private auth: AuthService,
		private activatedRoute: ActivatedRoute,
		private titleService: Title
	) { }

	ngOnInit() {
		this.titleService.setTitle('Logigator - Verify Mail');
		this.auth.verifyEmail(this.activatedRoute.snapshot.paramMap.get('token')).then(() => {
			this.success = true;
			this.loading = false;
		}).catch(e => {
			this.success = false;
			this.loading = false;
		});
	}

}
