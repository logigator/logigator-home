import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class BurgerMenuService {

	private _isOpen = false;

	constructor() { }

	public get getOpen() {
		return this._isOpen;
	}

	public set setOpen(state: boolean) {
		this._isOpen = state;
	}
}
