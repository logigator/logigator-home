import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemingService} from '../../services/theming/theming.service';
import {AuthService} from '../../services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {PopupService} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-settings-dropdown',
	templateUrl: './settings-dropdown.component.html',
	styleUrls: ['./settings-dropdown.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsDropdownComponent implements OnInit {

	@Output()
	public requestClosed: EventEmitter<any> = new EventEmitter();

	public showDropDown = true;
	public currentLang: string;

	constructor(
		public theming: ThemingService,
		private popupService: PopupService,
		private auth: AuthService,
		private translate: TranslateService
	) {}

	ngOnInit(): void {
		this.currentLang = this.translate.currentLang;
	}

	public languageChange() {
		this.translate.use(this.currentLang);
	}

	public changeTheme() {
		this.theming.toggleTheme();
	}

	public get isLoggedIn(): boolean {
		return this.auth.isLoggedIn;
	}

	public logout() {
		this.auth.logout();
		this.close();
	}

	public close() {
		this.requestClosed.emit();
	}
}
