import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import {UserSpaceRoutingModule} from './user-space-routing.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';


@NgModule({
	declarations: [UserSpaceComponent, ProjectListComponent, DrawerComponent, ComponentListComponent, AccountSettingsComponent],
	imports: [
		UserSpaceRoutingModule,
		CommonModule
	]
})
export class UserSpaceModule { }
