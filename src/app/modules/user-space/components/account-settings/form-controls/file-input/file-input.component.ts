import {
	Component,
	ElementRef,
	forwardRef,
	Input, OnInit,
	ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CropValue} from 'croppr';
import {HttpClient} from '@angular/common/http';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
	selector: 'app-file-input',
	templateUrl: './file-input.component.html',
	styleUrls: ['./file-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FileInputComponent),
			multi: true
		}
	]
})
export class FileInputComponent implements OnInit, ControlValueAccessor {

	@Input()
	public defaultImage: string;

	public imageFile: File;

	public isDragging = false;
	public isDisabled = false;

	private cropperDisabled = false;

	public onChange = (value: File) => {};
	public onTouch = () => {};

	constructor(private http: HttpClient) { }

	async ngOnInit() {
		if (this.defaultImage) {
			this.cropperDisabled = true;
			this.imageFile = new File([ await this.http.get(this.defaultImage, { responseType: 'blob' }).toPromise() ],
				this.defaultImage,
				{ type: 'image/jpeg' });
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	writeValue(obj: any): void {
	}

	public onDragStart(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.isDragging = true;
	}
	public onDragStop(evt: Event) {
		evt.preventDefault();
		evt.stopPropagation();
		this.isDragging = false;
	}

	public onDrop(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.isDragging = false;
		console.log('!');
		if (evt.dataTransfer.files)
			this.imageFile = evt.dataTransfer.files[0];
	}

	public fileChange(event: any) {
		if (event.target.files && event.target.files.length > 0)
			this.imageFile = event.target.files[0];
	}

	public onCrop(event: ImageCroppedEvent) {
		if (this.cropperDisabled) {
			this.cropperDisabled = false;
			return;
		}

		this.onChange(event.file as File);
	}

	public onCropperFail() {
		console.log('Failed to load image into cropper.');
	}
}
