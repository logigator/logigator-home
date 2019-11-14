/// <reference types="node" />

import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

export class ServerTranslationLoader implements TranslateLoader {

	getTranslation(lang: string): Observable<any> {
		console.log(path.join(__dirname, '..', 'logigator-home', 'assets', 'i18n', lang + '.json'));
		const file = fs.readFileSync(path.join(__dirname, '..', 'logigator-home', 'assets', 'i18n', lang + '.json')).toString();
		const jsonData = JSON.parse(file);
		return of(jsonData);
	}

}
