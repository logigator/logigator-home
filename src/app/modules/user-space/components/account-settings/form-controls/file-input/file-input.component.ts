import {
	AfterContentInit,
	Component,
	ElementRef,
	forwardRef,
	Input,
	ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as Croppr from 'croppr';
import {CropValue} from 'croppr';
import {HttpClient} from '@angular/common/http';

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
export class FileInputComponent implements AfterContentInit, ControlValueAccessor {

	@Input()
	public defaultImage: string;

	@ViewChild('image', {static: true})
	private imageElement: ElementRef;

	@ViewChild('canvas', {static: true})
	private canvasElement: ElementRef<HTMLCanvasElement>;

	public isDragging = false;
	public isDisabled = false;

	private _imgFile: File;
	private _imgDataURL = '';
	private _cropper: Croppr;

	public onChange = (value: File) => {};
	public onTouch = () => {};

	constructor(private http: HttpClient) { }

	async ngAfterContentInit() {
		if (this.defaultImage) {
			this.setFile(new File([
				await this.http.get(this.defaultImage, { responseType: 'blob' }).toPromise()
			], this.defaultImage));
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
		if (evt.dataTransfer.files)
			this.setFile(evt.dataTransfer.files[0]);
	}

	public fileChange(event: any) {
		if (event.target.files && event.target.files.length > 0)
			this.setFile(event.target.files[0]);
	}

	private setFile(file: File) {
		this._imgFile = file;

		const reader = new FileReader();
		reader.onload = (e: any) => {
			this._imgDataURL = e.target.result;

			if (!this._cropper) {
				this._cropper = new Croppr(this.imageElement.nativeElement, {
					aspectRatio: 1,
					onCropEnd: (x: CropValue) => {
						const ctx = this.canvasElement.nativeElement.getContext('2d');
						this.canvasElement.nativeElement.width = 512;
						this.canvasElement.nativeElement.height = 512;
						const image = new Image();
						image.onload = () => {
							ctx.drawImage(image, x.x, x.y, x.width, x.height, 0, 0, 512, 512);
							this.canvasElement.nativeElement.toBlob(blob => {
								this.onChange(new File([ blob ], this._imgFile.name, {type: 'image/jpeg'}));
							}, 'image/jpeg');
						};
						image.src = this._imgDataURL;
					}
				});
			}

			this._cropper.setImage(this._imgDataURL);
		};
		reader.readAsDataURL(file);
	}
}
