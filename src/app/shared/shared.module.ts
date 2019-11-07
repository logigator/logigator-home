import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {ErrorHandlingService} from './services/error-handling/error-handling.service';
import {ApiService} from './services/api/api.service';
import {PopupComponent} from './components/popup/popup.component';
import {BurgerMenuComponent} from './components/burger-menu/burger-menu.component';
import { LoginPopupComponent } from './components/login-popup/login-popup.component';
import { RegisterPopupComponent } from './components/register-popup/register-popup.component';
import {SettingsDropdownComponent} from './components/settings-dropdown/settings-dropdown.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SwitchComponent} from './components/switch/switch.component';
import {InputComponent} from './components/input/input.component';
import { InputErrorComponent } from './components/input-error/input-error.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		PopupComponent,
		BurgerMenuComponent,
		LoginPopupComponent,
		RegisterPopupComponent,
		SettingsDropdownComponent,
		RegisterPopupComponent,
		LoginPopupComponent,
		SwitchComponent,
		InputComponent,
		InputErrorComponent
	],
	entryComponents: [
		PopupComponent,
		LoginPopupComponent,
		RegisterPopupComponent
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		BurgerMenuComponent,
		SwitchComponent,
		InputComponent,
		InputErrorComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		TranslateModule.forChild()
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				AuthService,
				ErrorHandlingService,
				ApiService
			]
		};
	}
}
