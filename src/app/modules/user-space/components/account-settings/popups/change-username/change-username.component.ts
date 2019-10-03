import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../../shared/services/api/api.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-username.component.html',
	styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			username: ['', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(20),
				Validators.pattern('^[a-zA-Z0-9_\\-]+$')
			]]
		});
	}

	public async submit() {
		if (this.newCompForm.invalid)
			return;
		await this.api.updateProfile({ username: this.newCompForm.controls.username.value }).toPromise();
		this.requestClose.emit();
	}

}
