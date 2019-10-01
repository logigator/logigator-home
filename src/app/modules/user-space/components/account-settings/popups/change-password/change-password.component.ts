import { Component, OnInit } from '@angular/core';
import {PopupContentComp} from '../../../../../../shared/components/popup/popup-content-comp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		super();
	}

	ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			password: ['', [Validators.required]],
			passwordRepeat: ['', [Validators.required]]
		});
	}

	public submit() {
		if (this.newCompForm.invalid)
			return;

		this.requestClose.emit();
	}

}
