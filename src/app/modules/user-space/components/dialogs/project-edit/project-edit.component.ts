import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {UserProject} from '../../../../../shared/models/http-responses/user-project';
import {PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-project-edit',
	templateUrl: './project-edit.component.html',
	styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent extends PopupContentComp<UserProject> implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			name: [this.inputFromOpener.name, [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(20),
				Validators.pattern('^[a-zA-Z0-9_\\- ]+$')
			]],
			description: [this.inputFromOpener.description, [
				Validators.maxLength(1000)
			]]
		});
	}

	public async submit() {
		if (this.newCompForm.invalid)
			return;

		const changes: any = {};

		if (this.newCompForm.controls.name.dirty && this.newCompForm.controls.name.value !== this.inputFromOpener.name)
			changes.name = this.newCompForm.controls.name.value;

		if (this.newCompForm.controls.description.dirty && this.newCompForm.controls.description.value !== this.inputFromOpener.description)
			changes.description = this.newCompForm.controls.description.value;

		if (Object.keys(changes).length > 0)
			await this.api.updateProject(this.inputFromOpener.pk_id, changes).toPromise();
		this.requestClose.emit();
	}
}
