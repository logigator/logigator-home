import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {ApiService} from '../../../../shared/services/api/api.service';
import {Observable} from 'rxjs';
import {PopupService} from '../../../../shared/services/popup/popup.service';
import {ShareProjectComponent} from '../dialogs/share-project/share-project.component';
import {environment} from '../../../../../environments/environment';
import {ProjectEditComponent} from '../dialogs/project-edit/project-edit.component';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	public editorUrl = environment.editor;

	constructor(private api: ApiService, private popup: PopupService, private componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngOnInit() {}

	public get userProjects$(): Observable<UserProject[]> {
		return this.api.userProjects$;
	}

	public openShareDialog(project: number) {
		this.popup.showPopup(ShareProjectComponent, this.componentFactoryResolver, 'Share Project', false, project);
	}

	public openProjectEditDialog(project: UserProject) {
		this.popup.showPopup(ProjectEditComponent, this.componentFactoryResolver, 'Share Project', false, project);
	}
}
