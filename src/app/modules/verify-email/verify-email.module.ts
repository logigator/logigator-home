import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {VerifyEmailRoutingModule} from './verify-email-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
	declarations: [VerifyEmailComponent],
	imports: [
		CommonModule,
		SharedModule,
		TranslateModule.forChild(),
		VerifyEmailRoutingModule
	]
})
export class VerifyEmailModule { }
