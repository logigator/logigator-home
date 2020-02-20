import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './components/features/features.component';
import {FeaturesRoutingModule} from './features-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import { FeatureComponent } from './components/feature/feature.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
	declarations: [FeaturesComponent, FeatureComponent],
	imports: [
		FeaturesRoutingModule,
		CommonModule,
		TranslateModule,
		SharedModule
	]
})
export class FeaturesModule { }
