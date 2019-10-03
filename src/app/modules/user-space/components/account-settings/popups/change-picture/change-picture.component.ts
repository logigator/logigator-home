import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopupContentComp} from '../../../../../../shared/components/popup/popup-content-comp';
import {ApiService} from '../../../../../../shared/services/api/api.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-change-picture',
	templateUrl: './change-picture.component.html',
	styleUrls: ['./change-picture.component.scss']
})
export class ChangePictureComponent extends PopupContentComp implements OnInit {

	// will be replaced
	private defaultImageFile: File;
	private defaultImage: string;

	private cropperDisabled = false;

	public newCompForm: FormGroup;
	public imageFile: File;

	constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient) {
		super();
	}

	async ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			fileInput: ['', [
			]]
		});
		if (this.defaultImageFile) {
			this.imageFile = this.defaultImageFile;
		} else if (this.defaultImage) {
			this.cropperDisabled = true;
			this.imageFile = new File([ await this.http.get(this.defaultImage, { responseType: 'blob' }).toPromise() ],
				this.defaultImage,
				{ type: 'image/jpeg' });
		}
		this.newCompForm.controls.fileInput.valueChanges.subscribe((x) => this.imageFile = x);
	}

	public onCropperFail() {
		console.error('Failed to load image into cropper.');
	}

	public submit() {
		console.log('!');
	}
}
