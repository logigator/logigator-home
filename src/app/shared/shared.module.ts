import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {ErrorHandlingService} from './services/error-handling/error-handling.service';
import {ApiService} from './services/api/api.service';
import {BurgerMenuComponent} from './components/burger-menu/burger-menu.component';
import {SettingsDropdownComponent} from './components/settings-dropdown/settings-dropdown.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { LazyLoadDirective } from './directives/lazy-load/lazy-load.directive';
import {LogigatorSharedCompsModule} from '@logigator/logigator-shared-comps';

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		BurgerMenuComponent,
		SettingsDropdownComponent,
		LazyLoadDirective
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		BurgerMenuComponent,
		LazyLoadDirective
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		TranslateModule.forChild(),
		LogigatorSharedCompsModule
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
