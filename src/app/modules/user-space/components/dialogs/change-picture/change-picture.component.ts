import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../../../shared/services/api/api.service';
import {AccountActionErrorResolverService, PopupContentComp} from '@logigator/logigator-shared-comps';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
	selector: 'app-change-picture',
	templateUrl: './change-picture.component.html',
	styleUrls: ['./change-picture.component.scss']
})
export class ChangePictureComponent extends PopupContentComp implements OnInit {

	public newCompForm: FormGroup;
	public imageFile: File;

	private croppedImage: Blob;

	public errorMessage = '';
	public showSuccessMessage = false;

	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService,
		private http: HttpClient,
		private accountActionErrorResolver: AccountActionErrorResolverService
	) {
		super();
	}

	async ngOnInit() {
		this.newCompForm = this.formBuilder.group({
			fileInput: ['', [
			]]
		});
		if (this.inputFromOpener) {
			this.imageFile = new File([ await this.http.get(this.inputFromOpener, { responseType: 'blob' }).toPromise() ],
				this.inputFromOpener,
				{ type: 'image/jpeg' });
		}
		this.newCompForm.controls.fileInput.valueChanges.subscribe((x) => this.imageFile = x);
	}

	public onCropperFail() {
		console.error('Failed to load image into cropper.');
	}

	public onCrop(event: ImageCroppedEvent) {
		this.croppedImage = base64ToFile(event.base64);
	}

	public async submit() {
		if (this.croppedImage) {
			try {
				await this.api.changeProfilePicture(this.croppedImage).toPromise();
				this.showSuccessMessage = true;
			} catch (e) {
				this.errorMessage = await this.accountActionErrorResolver.getErrorMessage(e);
			}
		}
	}

	public close() {
		this.requestClose.emit();
	}
}
