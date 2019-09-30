import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../../shared/models/http-responses/user-info';
import {ApiService} from '../../../../shared/services/api/api.service';

@Component({
	selector: 'app-user-space',
	templateUrl: './user-space.component.html',
	styleUrls: ['./user-space.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UserSpaceComponent implements OnInit {

	public userInfo$: Observable<UserInfo>;

	constructor(private auth: AuthService, private api: ApiService) { }

	async ngOnInit() {
		this.userInfo$ = this.auth.userInfo$;
	}

}
