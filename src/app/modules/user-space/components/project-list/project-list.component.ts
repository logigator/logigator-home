import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {ApiService} from '../../../../shared/services/api/api.service';
import {Observable} from 'rxjs';
import {ShareProjectComponent} from '../dialogs/share-project/share-project.component';
import {environment} from '../../../../../environments/environment';
import {ProjectEditComponent} from '../dialogs/project-edit/project-edit.component';
import {ProjectDeleteComponent} from '../dialogs/project-delete/project-delete.component';
import {ProjectInfoComponent} from '../dialogs/project-info/project-info.component';
import {NewProjectComponent} from '../dialogs/new-project/new-project.component';
import {PopupService} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	public editorUrl = environment.editor;
	public apiUrl = environment.apiPrefix;

	constructor(private api: ApiService, private popup: PopupService, private componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngOnInit() {}

	public get userProjects$(): Observable<UserProject[]> {
		return this.api.userProjects$;
	}

	public openShareDialog(project: number) {
		this.popup.showPopup(ShareProjectComponent, 'Share Project', false, project, this.componentFactoryResolver);
	}

	public openProjectEditDialog(project: UserProject) {
		this.popup.showPopup(ProjectEditComponent, 'Edit Project', false, project, this.componentFactoryResolver);
	}

	public openProjectDeleteDialog(project: UserProject) {
		this.popup.showPopup(ProjectDeleteComponent, 'Confirm Delete', false, project, this.componentFactoryResolver);
	}

	public openProjectInfoDialog(project: UserProject) {
		this.popup.showPopup(ProjectInfoComponent, 'Information', false, project, this.componentFactoryResolver);
	}

	public openProjectAddDialog() {
		this.popup.showPopup(NewProjectComponent, 'New Project', false, null, this.componentFactoryResolver);
	}
}
