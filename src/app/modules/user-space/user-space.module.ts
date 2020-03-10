import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSpaceComponent } from './components/user-space/user-space.component';
import {UserSpaceRoutingModule} from './user-space-routing.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {DrawerComponent} from './components/drawer/drawer.component';
import {ShareProjectComponent} from './components/dialogs/share-project/share-project.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../shared/shared.module';
import {ProjectEditComponent} from './components/dialogs/project-edit/project-edit.component';
import {ComponentEditComponent} from './components/dialogs/component-edit/component-edit.component';
import {ProjectDeleteComponent} from './components/dialogs/project-delete/project-delete.component';
import {ComponentDeleteComponent} from './components/dialogs/component-delete/component-delete.component';
import {ChangePasswordComponent} from './components/dialogs/change-password/change-password.component';
import {ChangeEmailComponent} from './components/dialogs/change-email/change-email.component';
import {ChangeUsernameComponent} from './components/dialogs/change-username/change-username.component';
import {ChangePictureComponent} from './components/dialogs/change-picture/change-picture.component';
import {ComponentInfoComponent} from './components/dialogs/component-info/component-info.component';
import {ProjectInfoComponent} from './components/dialogs/project-info/project-info.component';
import {NewComponentComponent} from './components/dialogs/new-component/new-component.component';
import {NewProjectComponent} from './components/dialogs/new-project/new-project.component';
import {LogigatorSharedCompsModule} from '@logigator/logigator-shared-comps';

@NgModule({
	declarations: [
		UserSpaceComponent,
		ProjectListComponent,
		ComponentListComponent,
		AccountSettingsComponent,
		ChangePasswordComponent,
		ChangeUsernameComponent,
		ChangePictureComponent,
		ChangeEmailComponent,
		DrawerComponent,
		ShareProjectComponent,
		ProjectEditComponent,
		ComponentEditComponent,
		ProjectDeleteComponent,
		ComponentDeleteComponent,
		ComponentInfoComponent,
		ProjectInfoComponent,
		NewComponentComponent,
		NewProjectComponent
	],
	entryComponents: [
		ChangePasswordComponent,
		ChangeUsernameComponent,
		ChangePictureComponent,
		ChangeEmailComponent,
		ShareProjectComponent,
		ProjectEditComponent,
		ComponentEditComponent,
		ProjectDeleteComponent,
		ComponentDeleteComponent,
		ComponentInfoComponent,
		ProjectInfoComponent,
		NewComponentComponent,
		NewProjectComponent
	],
	imports: [
		UserSpaceRoutingModule,
		CommonModule,
		ReactiveFormsModule,
		ImageCropperModule,
		TranslateModule.forChild(),
		SharedModule,
		FormsModule,
		LogigatorSharedCompsModule
	]
})
export class UserSpaceModule { }
