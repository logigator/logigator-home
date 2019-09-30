import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlingService} from '../error-handling/error-handling.service';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {HttpResponseData} from '../../models/http-responses/http-response-data';
import {UserInfo} from '../../models/http-responses/user-info';
import {UserComponent} from '../../models/http-responses/user-component';
import {AuthService} from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient, private errorHandling: ErrorHandlingService, private auth: AuthService) { }

	public async getUserComponents(): Promise<UserComponent[]> {
		if (!this.auth.isLoggedIn) {
			return [];
		}

		return this.http.get<HttpResponseData<UserComponent[]>>('/api/project/get-all-components-info').pipe(
			map(data => data.result),
			this.errorHandling.catchErrorOperator('Cannot get Components from Server', []),
		).toPromise();
	}

	public async getUserProjects(): Promise<UserComponent[]> {
		if (!this.auth.isLoggedIn) {
			return [];
		}

		return this.http.get<HttpResponseData<UserComponent[]>>('/api/project/get-all-projects-info').pipe(
			map(data => data.result),
			this.errorHandling.catchErrorOperator('Cannot get Components from Server', []),
		).toPromise();
	}
}
