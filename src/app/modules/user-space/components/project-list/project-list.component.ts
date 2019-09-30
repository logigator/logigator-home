import {Component, OnInit} from '@angular/core';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {ApiService} from '../../../../shared/services/api/api.service';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	public projects: UserProject[];

	constructor(private api: ApiService) {
	}

	async ngOnInit() {
		this.projects = await this.api.getUserProjects();
	}

}
