import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {UserComponent} from '../../../../../shared/models/http-responses/user-component';
import {PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-project-edit',
	templateUrl: './component-edit.component.html',
	styleUrls: ['./component-edit.component.scss']
})
export class ComponentEditComponent extends PopupContentComp<UserComponent> implements OnInit {

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
			symbol: [this.inputFromOpener.symbol, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(5),
				Validators.pattern('^[a-zA-Z0-9_\\-]+$')
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

		if (this.newCompForm.controls.symbol.dirty && this.newCompForm.controls.symbol.value !== this.inputFromOpener.symbol)
			changes.symbol = this.newCompForm.controls.symbol.value;

		if (this.newCompForm.controls.description.dirty && this.newCompForm.controls.description.value !== this.inputFromOpener.description)
			changes.description = this.newCompForm.controls.description.value;

		if (Object.keys(changes).length > 0)
			await this.api.updateComponent(this.inputFromOpener.pk_id, changes).toPromise();
		this.requestClose.emit();
	}
}
