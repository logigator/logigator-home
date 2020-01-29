import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './components/features/features.component';
import {FeaturesRoutingModule} from './features-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import { FeatureComponent } from './components/feature/feature.component';

@NgModule({
	declarations: [FeaturesComponent, FeatureComponent],
	imports: [
		FeaturesRoutingModule,
		CommonModule,
		TranslateModule
	]
})
export class FeaturesModule { }
