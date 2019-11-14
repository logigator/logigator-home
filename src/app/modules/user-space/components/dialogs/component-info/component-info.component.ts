import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {UserComponent} from '../../../../../shared/models/http-responses/user-component';

@Component({
	selector: 'app-project-info',
	templateUrl: './component-info.component.html',
	styleUrls: ['./component-info.component.scss']
})
export class ComponentInfoComponent extends PopupContentComp<UserComponent> implements OnInit {

	public project: UserComponent;

	constructor() {
		super();
	}

	ngOnInit() {
		this.project = this.inputFromOpener;
	}
}
