import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserSpaceComponent} from './components/user-space/user-space.component';
import {ComponentListComponent} from './components/component-list/component-list.component';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {AccountSettingsComponent} from './components/account-settings/account-settings.component';

const routes: Routes = [
	{
		path: '',
		component: UserSpaceComponent,
		children: [
			{
				path: 'components',
				component: ComponentListComponent
			},
			{
				path: 'projects',
				component: ProjectListComponent
			},
			{
				path: 'settings',
				component: AccountSettingsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserSpaceRoutingModule { }
