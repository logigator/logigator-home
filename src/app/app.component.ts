import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ThemingService} from './shared/services/theming/theming.service';
import {NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {WINDOW} from './shared/injectable-window';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private translate: TranslateService,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId: string,
		@Inject(WINDOW) private window: Window,
		private theming: ThemingService
	) {
		this.initTranslation();

		if (!isPlatformBrowser(this.platformId)) return;
		this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd && !e.urlAfterRedirects.includes('auth-callback')) {
				gtag('config', 'UA-151071040-2', {
					page_path: e.urlAfterRedirects
				});
			}
		});
		this.theming.init();
	}

	private initTranslation() {
		this.translate.addLangs(['en', 'de']);
		if (isPlatformBrowser(this.platformId)) {
			const lang = this.window.localStorage.getItem('lang');
			if (lang) {
				this.translate.setDefaultLang(lang);
				this.translate.use(lang);
			} else {
				this.translate.setDefaultLang('en');
				this.translate.use('en');
			}
			this.translate.onLangChange.subscribe((e: LangChangeEvent) => {
				this.window.localStorage.setItem('lang', e.lang);
			});
		} else {
			this.translate.setDefaultLang('en');
			this.translate.use('en');
		}
	}
}
