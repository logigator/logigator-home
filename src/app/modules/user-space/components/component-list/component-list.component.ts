import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {UserComponent} from '../../../../shared/models/http-responses/user-component';
import {ApiService} from '../../../../shared/services/api/api.service';
import {Observable} from 'rxjs';
import {ShareProjectComponent} from '../dialogs/share-project/share-project.component';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {PopupService} from '../../../../shared/services/popup/popup.service';
import {ComponentEditComponent} from '../dialogs/component-edit/component-edit.component';
import {environment} from '../../../../../environments/environment';

@Component({
	selector: 'app-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

	public editorUrl = environment.editor;

	constructor(private api: ApiService, private popup: PopupService, private componentFactoryResolver: ComponentFactoryResolver) { }

	ngOnInit() { }

	public get userComponents$(): Observable<UserComponent[]> {
		return this.api.userComponents$;
	}

	public openShareDialog(project: number) {
		this.popup.showPopup(ShareProjectComponent, this.componentFactoryResolver, 'Share Component', false, project);
	}

	public openProjectEditDialog(project: UserComponent) {
		this.popup.showPopup(ComponentEditComponent, this.componentFactoryResolver, 'Edit Component', false, project);
	}
}
