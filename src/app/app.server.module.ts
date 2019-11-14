import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppMissingTranslationHandler} from './shared/models/translation/missing-translation-handler';
import {ServerTranslationLoader} from './shared/models/translation/server-translation-loader';

@NgModule({
	imports: [
		AppModule,
		ServerModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: ServerTranslationLoader
			},
			missingTranslationHandler: {
				provide: MissingTranslationHandler,
				useClass: AppMissingTranslationHandler
			}
		})
	],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
