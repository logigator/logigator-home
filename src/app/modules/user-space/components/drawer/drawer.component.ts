import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

	public isOpen = false;

	constructor() {
	}

	ngOnInit() {
	}
}
