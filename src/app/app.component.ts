import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private translate: TranslateService,
		private router: Router
	) {
		this.initTranslation();

		this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				gtag('config', 'UA-151071040-2', {
					page_path: e.urlAfterRedirects
				});
			}
		});
	}

	private initTranslation() {
		this.translate.addLangs(['en', 'de']);
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}
}
