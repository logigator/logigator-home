import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DrawerService {

	private drawerOpen = false;

	constructor() {
	}

	get getOpen(): boolean {
		return this.drawerOpen;
	}

	set setOpen(state: boolean) {
		this.drawerOpen = state;
	}
}
