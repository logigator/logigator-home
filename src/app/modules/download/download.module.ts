import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DownloadRoutingModule} from './download-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import { DownloadComponent } from './components/download/download.component';
import { CurrentVersionDownloadComponent } from './components/current-version-download/current-version-download.component';
import {SharedModule} from '../../shared/shared.module';
import {LogigatorSharedCompsModule} from '@logigator/logigator-shared-comps';


@NgModule({
	declarations: [
		DownloadComponent,
		CurrentVersionDownloadComponent
	],
	imports: [
		CommonModule,
		TranslateModule.forChild(),
		SharedModule,
		LogigatorSharedCompsModule,
		DownloadRoutingModule
	]
})
export class DownloadModule { }
