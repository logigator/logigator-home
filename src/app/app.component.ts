import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private translate: TranslateService
	) {
		this.initTranslation();
	}

	private initTranslation() {
		this.translate.addLangs(['en', 'de']);
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}
}
