import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {ApiService} from '../../../../shared/services/api/api.service';
import {UserComponent} from '../../../../shared/models/http-responses/user-component';

@Component({
	selector: 'app-user-space',
	templateUrl: './user-space.component.html',
	styleUrls: ['./user-space.component.scss']
})
export class UserSpaceComponent implements OnInit {

	public userInfo$: Observable<UserInfo>;

	constructor(private auth: AuthService, private api: ApiService) { }

	async ngOnInit() {
		this.userInfo$ = this.auth.userInfo$;
	}

}
