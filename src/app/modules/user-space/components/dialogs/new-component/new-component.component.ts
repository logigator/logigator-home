import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {PopupContentComp} from '@logigator/logigator-shared-comps';

@Component({
	selector: 'app-new-component',
	templateUrl: './new-component.component.html',
	styleUrls: ['./new-component.component.scss']
})
export class NewComponentComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			compName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9_\\- ]+$')]],
			compSymbol: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[a-zA-Z0-9_\\-]+$')]]
		});
	}

	public async fromSubmitClick() {
		if (this.newCompForm.invalid)
			return;
		await this.api.newComponent(this.newCompForm.controls.compName.value, this.newCompForm.controls.compSymbol.value).toPromise();
		this.requestClose.emit();
	}

}
