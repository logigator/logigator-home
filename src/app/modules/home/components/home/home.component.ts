import {Component, OnInit} from '@angular/core';
import {ThemingService} from '../../../../shared/services/theming/theming.service';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private theming: ThemingService, private titleService: Title) { }

	ngOnInit() {
		this.titleService.setTitle('Logigator');
	}

	public get theme() {
		return this.theming.currentTheme;
	}
}
