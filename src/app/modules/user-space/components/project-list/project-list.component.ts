import {Component, OnInit} from '@angular/core';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {ApiService} from '../../../../shared/services/api/api.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	constructor(private api: ApiService) {
	}

	ngOnInit() {}

	public get userProjects$(): Observable<UserProject[]> {
		return this.api.userProjects$;
	}
}
