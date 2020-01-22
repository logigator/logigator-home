import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DownloadRoutingModule} from './download-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import { DownloadComponent } from './components/download/download.component';



@NgModule({
	declarations: [DownloadComponent],
	imports: [
		CommonModule,
		TranslateModule.forChild(),
		DownloadRoutingModule
	]
})
export class DownloadModule { }
