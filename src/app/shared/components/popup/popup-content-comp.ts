import {EventEmitter, Input, Output} from '@angular/core';

export abstract class PopupContentComp<T = any> {

	@Output()
	requestClose: EventEmitter<void> = new EventEmitter<void>();

	@Input()
	inputFromOpener: T;
}
