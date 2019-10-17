import { Component, OnInit } from '@angular/core';
import {DrawerService} from '../../../../shared/services/drawer/drawer.service';

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

	constructor(private drawerService: DrawerService) {
	}

	ngOnInit() {
	}

	get drawerOpen() {
		return this.drawerService.getOpen;
	}

	public drawerClose() {
		this.drawerService.setOpen = false;
	}
}
