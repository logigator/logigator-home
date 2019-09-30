import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserSpaceComponent} from './components/user-space/user-space.component';

const routes: Routes = [
	{
		path: '',
		component: UserSpaceComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserSpaceRoutingModule { }
