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

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		PopupComponent,
		BurgerMenuComponent
	],
	entryComponents: [
		PopupComponent
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		BurgerMenuComponent
	],
	imports: [
		CommonModule,
		RouterModule
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
