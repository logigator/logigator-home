import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
	selector: 'app-imprint',
	templateUrl: './imprint.component.html',
	styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

	constructor(private titleService: Title) { }

	ngOnInit() {
		this.titleService.setTitle('Logigator - Imprint');
	}

}
