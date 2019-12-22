import { Component, OnInit } from '@angular/core';
import {UserProject} from '../../../../../shared/models/http-responses/user-project';
import {environment} from '../../../../../../environments/environment';
import {PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-project-info',
	templateUrl: './project-info.component.html',
	styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent extends PopupContentComp<UserProject> implements OnInit {

	public project: UserProject;
	public apiPath = environment.apiPrefix;

	constructor() {
		super();
	}

	ngOnInit() {
		this.project = this.inputFromOpener;
	}
}
