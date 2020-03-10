import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprintComponent } from './components/imprint/imprint.component';
import {ImprintRoutingModule} from './imprint-routing.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
	declarations: [ImprintComponent],
	imports: [
		ImprintRoutingModule,
		CommonModule,
		TranslateModule.forChild()
	]
})
export class ImprintModule { }
