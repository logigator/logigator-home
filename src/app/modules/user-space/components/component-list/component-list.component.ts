import {Component, OnInit} from '@angular/core';
import {UserComponent} from '../../../../shared/models/http-responses/user-component';
import {ApiService} from '../../../../shared/services/api/api.service';

@Component({
	selector: 'app-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

	public components: UserComponent[];

	constructor(private api: ApiService) {
	}

	async ngOnInit() {
		this.components = await this.api.getUserComponents();
	}

}
