import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import {PrivacyPolicyRoutingModule} from './privacy-policy-routing.module';



@NgModule({
	declarations: [PrivacyPolicyComponent],
	imports: [
		PrivacyPolicyRoutingModule,
		CommonModule
	]
})
export class PrivacyPolicyModule { }
