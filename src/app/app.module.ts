import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './modules/home/home.module';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppMissingTranslationHandler} from './shared/models/translation/missing-translation-handler';
import {CredentialsInterceptor} from './shared/interceptors/credentials';
import {WINDOW, windowFactory} from './shared/injectable-window';
import {LogigatorSharedCompsModule, SharedCompsAuthService, SharedCompsThemingService} from '@logigator/logigator-shared-comps';
import {ThemingService} from './shared/services/theming/theming.service';
import {AuthService} from './shared/services/auth/auth.service';
import {CacheBustingTranslationLoader} from './shared/models/translation/cache-busting-translation-loader';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		SharedModule.forRoot(),
		HomeModule,
		AppRoutingModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: CacheBustingTranslationLoader
			},
			missingTranslationHandler: {
				provide: MissingTranslationHandler,
				useClass: AppMissingTranslationHandler
			}
		}),
		LogigatorSharedCompsModule.forRoot({
			themingService: {
				provide: SharedCompsThemingService,
				useExisting: ThemingService
			},
			authService: {
				provide: SharedCompsAuthService,
				useExisting: AuthService
			}
		})
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CredentialsInterceptor,
			multi: true
		},
		{
			provide: WINDOW,
			useFactory: windowFactory
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
