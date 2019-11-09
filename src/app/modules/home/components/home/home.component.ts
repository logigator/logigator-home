import {Component, OnInit} from '@angular/core';
import {ThemingService} from '../../../../shared/services/theming/theming.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private theming: ThemingService) { }

	ngOnInit() {
	}

	public get theme() {
		return this.theming.currentTheme;
	}
}
