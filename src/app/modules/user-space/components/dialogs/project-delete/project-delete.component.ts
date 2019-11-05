import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {UserComponent} from '../../../../../shared/models/http-responses/user-component';

@Component({
	selector: 'app-project-delete',
	templateUrl: './project-delete.component.html',
	styleUrls: ['./project-delete.component.scss']
})
export class ProjectDeleteComponent extends PopupContentComp<UserComponent> implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({});
	}

	public async submit() {
		if (this.newCompForm.invalid)
			return;

		await this.api.deleteProject(this.inputFromOpener.pk_id).toPromise();
		this.requestClose.emit();
	}
}
