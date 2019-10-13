import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import {UserSpaceRoutingModule} from './user-space-routing.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/account-settings/popups/change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FileInputComponent } from './components/account-settings/form-controls/file-input/file-input.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ChangeUsernameComponent} from './components/account-settings/popups/change-username/change-username.component';
import { ChangePictureComponent } from './components/account-settings/popups/change-picture/change-picture.component';
import {ChangeEmailComponent} from './components/account-settings/popups/change-email/change-email.component';

@NgModule({
	declarations: [
		UserSpaceComponent,
		ProjectListComponent,
		DrawerComponent,
		ComponentListComponent,
		AccountSettingsComponent,
		ChangePasswordComponent,
		FileInputComponent,
		ChangeUsernameComponent,
		ChangePictureComponent,
		ChangeEmailComponent
	],
	entryComponents: [
		ChangePasswordComponent,
		ChangeUsernameComponent,
		ChangePictureComponent,
		ChangeEmailComponent
	],
	imports: [
		UserSpaceRoutingModule,
		CommonModule,
		ReactiveFormsModule,
		ImageCropperModule
	]
})
export class UserSpaceModule { }
