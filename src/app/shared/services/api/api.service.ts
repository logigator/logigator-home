import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlingService} from '../error-handling/error-handling.service';
import {Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {HttpResponseData} from '../../models/http-responses/http-response-data';
import {UserInfo} from '../../models/http-responses/user-info';
import {UserComponent} from '../../models/http-responses/user-component';
import {AuthService} from '../auth/auth.service';
import {UserProject} from '../../models/http-responses/user-project';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private _userProjects$: Observable<UserProject[]>;
	private _userComponents$: Observable<UserComponent[]>;

	constructor(private http: HttpClient, private errorHandling: ErrorHandlingService, private auth: AuthService) { }

	public get userProjects$(): Observable<UserProject[]> {
		if (!this._userProjects$)
			this.loadUserProjects();
		return this._userProjects$;
	}

	public get userComponents$(): Observable<UserComponent[]> {
		if (!this._userComponents$)
			this.loadUserComponents();
		return this._userComponents$;
	}

	public loadUserComponents(): Observable<UserComponent[]> {
		if (!this.auth.isLoggedIn)
			return of([]);

		this._userComponents$ = this.http.get<HttpResponseData<UserComponent[]>>('/api/project/get-all-components-info').pipe(
			map(data => data.result),
			shareReplay(),
			this.errorHandling.catchErrorOperator('Cannot get Components from Server', [])
		);
		return this._userComponents$;
	}

	public loadUserProjects(): Observable<UserProject[]> {
		if (!this.auth.isLoggedIn)
			return of([]);

		this._userProjects$ = this.http.get<HttpResponseData<UserComponent[]>>('/api/project/get-all-projects-info').pipe(
			map(data => data.result),
			shareReplay(),
			this.errorHandling.catchErrorOperator('Cannot get Projects from Server', [])
		);
		return this._userProjects$;
	}

	public changePassword(password: string) {
		this.http.post<HttpResponseData<UserComponent[]>>('/api/user/change-password', { password }).pipe(
			map(data => data.result),
			this.errorHandling.catchErrorOperator('Could not change password', [])
		);
	}
}
