import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FeaturesComponent} from './components/features/features.component';

const routes: Routes = [
	{
		path: '',
		component: FeaturesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FeaturesRoutingModule { }
