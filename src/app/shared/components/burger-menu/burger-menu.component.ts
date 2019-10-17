import { Component, OnInit } from '@angular/core';
import {BurgerMenuService} from '../../services/burger-menu/burger-menu.service';

@Component({
	selector: 'app-burger-menu',
	templateUrl: './burger-menu.component.html',
	styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {

	constructor(private burgerMenuService: BurgerMenuService) {
	}

	ngOnInit() {
	}

	public setOpen(state: boolean) {
		this.burgerMenuService.setOpen = state;
	}

	public get getOpen() {
		return this.burgerMenuService.getOpen;
	}
}
