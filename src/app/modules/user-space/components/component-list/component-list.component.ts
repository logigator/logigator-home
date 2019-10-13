import {Component, OnInit} from '@angular/core';
import {UserComponent} from '../../../../shared/models/http-responses/user-component';
import {ApiService} from '../../../../shared/services/api/api.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-component-list',
	templateUrl: './component-list.component.html',
	styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

	constructor(private api: ApiService) { }

	ngOnInit() { }

	public get userComponents$(): Observable<UserComponent[]> {
		return this.api.userComponents$;
	}

}
