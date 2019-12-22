import { Component, OnInit } from '@angular/core';
import {UserComponent} from '../../../../../shared/models/http-responses/user-component';
import {environment} from '../../../../../../environments/environment';
import {PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-project-info',
	templateUrl: './component-info.component.html',
	styleUrls: ['./component-info.component.scss']
})
export class ComponentInfoComponent extends PopupContentComp<UserComponent> implements OnInit {

	public project: UserComponent;
	public apiPath = environment.apiPrefix;

	constructor() {
		super();
	}

	ngOnInit() {
		this.project = this.inputFromOpener;
	}
}
