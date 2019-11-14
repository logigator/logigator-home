import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {UserProject} from '../../../../../shared/models/http-responses/user-project';

@Component({
	selector: 'app-project-info',
	templateUrl: './project-info.component.html',
	styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent extends PopupContentComp<UserProject> implements OnInit {

	public project: UserProject;

	constructor() {
		super();
	}

	ngOnInit() {
		this.project = this.inputFromOpener;
	}
}
