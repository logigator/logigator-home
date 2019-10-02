import {Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as Croppr from 'croppr';

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

	@ViewChild('image', {static: true})
	private imageElement: ElementRef;

	public isDragging = false;
	public isDisabled = false;
	public imgDataURL = '';

	private croppr: Croppr;

	public onChange = (value: File) => {};
	public onTouch = () => {};

	constructor() { }

	ngOnInit() {

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

	public onImageReady() {
		if (!this.croppr)
			this.croppr = new Croppr(this.imageElement.nativeElement, {
				aspectRatio: 1
			});
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
		if (event.target.files)
			this.setFile(event.target.files[0]);
	}

	private setFile(file: File) {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			this.imgDataURL = e.target.result;
		};
		reader.readAsDataURL(file);

		this.onChange(file);
	}
}
