import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {PopupContentComp} from '../../../../../shared/components/popup/popup-content-comp';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-email.component.html',
	styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			email: ['', [
				Validators.required,
				Validators.email
			]]
		});
	}

	public async submit() {
		if (this.newCompForm.invalid)
			return;
		await this.api.updateProfile({ email: this.newCompForm.controls.email.value }).toPromise();
		this.requestClose.emit();
	}

}
