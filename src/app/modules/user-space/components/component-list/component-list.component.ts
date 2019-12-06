import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {UserComponent} from '../../../../shared/models/http-responses/user-component';
import {ApiService} from '../../../../shared/services/api/api.service';
import {Observable} from 'rxjs';
import {ShareProjectComponent} from '../dialogs/share-project/share-project.component';
import {ComponentEditComponent} from '../dialogs/component-edit/component-edit.component';
import {environment} from '../../../../../environments/environment';
import {ComponentDeleteComponent} from '../dialogs/component-delete/component-delete.component';
import {ComponentInfoComponent} from '../dialogs/component-info/component-info.component';
import {NewComponentComponent} from '../dialogs/new-component/new-component.component';
import {PopupService} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

	public editorUrl = environment.editor;
	public apiUrl = environment.apiPrefix;

	constructor(private api: ApiService, private popup: PopupService, private componentFactoryResolver: ComponentFactoryResolver) { }

	ngOnInit() { }

	public get userComponents$(): Observable<UserComponent[]> {
		return this.api.userComponents$;
	}

	public openShareDialog(project: number) {
		this.popup.showPopup(ShareProjectComponent, 'Share Component', false, project, this.componentFactoryResolver);
	}

	public openProjectEditDialog(project: UserComponent) {
		this.popup.showPopup(ComponentEditComponent, 'Edit Component', false, project, this.componentFactoryResolver);
	}

	public openProjectDeleteDialog(project: UserComponent) {
		this.popup.showPopup(ComponentDeleteComponent, 'Confirm Delete', false, project, this.componentFactoryResolver);
	}

	public openProjectInfoDialog(project: UserComponent) {
		this.popup.showPopup(ComponentInfoComponent, 'Information', false, project, this.componentFactoryResolver);
	}

	public openProjectAddDialog() {
		this.popup.showPopup(NewComponentComponent, 'New Component', false, null, this.componentFactoryResolver);
	}
}
