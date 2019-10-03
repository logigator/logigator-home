import {
	Component,
	ElementRef,
	forwardRef,
	Input, OnInit,
	ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
export class FileInputComponent implements OnInit, ControlValueAccessor {

	public isDragging = false;
	public isDisabled = false;

	public onChange = (value: File) => {};
	public onTouch = () => {};

	constructor(private http: HttpClient) { }

	async ngOnInit() {

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

	writeValue(obj: File): void {
		this.onChange(obj);
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
			this.onChange(evt.dataTransfer.files[0]);
	}

	public fileChange(event: any) {
		if (event.target.files && event.target.files.length > 0)
			this.onChange(event.target.files[0]);
	}
}
