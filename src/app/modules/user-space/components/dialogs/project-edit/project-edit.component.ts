import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {UserProject} from '../../../../../shared/models/http-responses/user-project';

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
			name: ['', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(20),
				Validators.pattern('^[a-zA-Z0-9_\\- ]+$')
			]],
			description: ['', [
				Validators.maxLength(1000)
			]]
		});

		this.newCompForm.controls.name.setValue(this.inputFromOpener.name);
		this.newCompForm.controls.description.setValue(this.inputFromOpener.description);
	}

	public async submit() {
		if (this.newCompForm.invalid)
			return;

		this.newCompForm.controls.submit.disable();

		const changes: any = {};

		if (this.newCompForm.controls.name.dirty && this.newCompForm.controls.name.value !== this.inputFromOpener.name)
			changes.name = this.newCompForm.controls.name.value;

		if (this.newCompForm.controls.description.dirty && this.newCompForm.controls.description.value !== this.inputFromOpener.description)
			changes.description = this.newCompForm.controls.description.value;

		await this.api.updateProject(changes).toPromise();
		this.requestClose.emit();
	}
}
