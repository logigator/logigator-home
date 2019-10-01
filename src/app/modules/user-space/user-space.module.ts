import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import {UserSpaceRoutingModule} from './user-space-routing.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/account-settings/popups/change-password/change-password.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
	declarations: [
		UserSpaceComponent,
		ProjectListComponent,
		DrawerComponent,
		ComponentListComponent,
		AccountSettingsComponent,
		ChangePasswordComponent
	],
	entryComponents: [
		ChangePasswordComponent
	],
	imports: [
		UserSpaceRoutingModule,
		CommonModule,
		ReactiveFormsModule
	]
})
export class UserSpaceModule { }
