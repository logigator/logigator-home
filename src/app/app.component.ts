import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ThemingService} from './shared/services/theming/theming.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private translate: TranslateService,
		private theming: ThemingService
	) {
		this.initTranslation();
		this.theming.init();
	}

	private initTranslation() {
		this.translate.addLangs(['en', 'de']);
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}
}
