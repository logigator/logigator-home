import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-features',
	templateUrl: './features.component.html',
	styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

	constructor(private titleService: Title) { }

	ngOnInit() {
		this.titleService.setTitle('Logigator - Features');
	}

}
