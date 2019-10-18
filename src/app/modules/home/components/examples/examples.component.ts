import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {ApiService} from '../../../../shared/services/api/api.service';

@Component({
	selector: 'app-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

	constructor(private api: ApiService) {
	}

	ngOnInit() {
	}

	public get userProjects$(): Observable<UserProject[]> {
		return this.api.userProjects$;
	}

}
