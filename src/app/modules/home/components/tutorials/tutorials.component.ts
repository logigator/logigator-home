import { Component, OnInit } from '@angular/core';
import {ThemingService} from '../../../../shared/services/theming/theming.service';

@Component({
	selector: 'app-tutorials',
	templateUrl: './tutorials.component.html',
	styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

	constructor(private theming: ThemingService) { }

	get theme() {
		return this.theming.currentTheme;
	}

	ngOnInit() {
	}

}
