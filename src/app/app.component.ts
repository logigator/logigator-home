import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ThemingService} from './shared/services/theming/theming.service';
import {NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private translate: TranslateService,
		private router: Router,
		@Inject(PLATFORM_ID) platformId: string
		private theming: ThemingService
	) {
		this.initTranslation();

		if (!isPlatformBrowser(platformId)) return;
		this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd) {
				gtag('config', 'UA-151071040-2', {
					page_path: e.urlAfterRedirects
				});
			}
		});
		this.theming.init();
	}

	private initTranslation() {
		this.translate.addLangs(['en', 'de']);
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}
}
