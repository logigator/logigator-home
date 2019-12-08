import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			projName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_\\- ]+$')]]
		});
	}

	public async fromSubmitClick() {
		if (this.newCompForm.invalid)
			return;
		await this.api.newProject(this.newCompForm.controls.projName.value).toPromise();
		this.requestClose.emit();
	}

}
