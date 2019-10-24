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
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not get Components from Server: (${x.status}) ${x.error.error.description}`,
				[])
		);
		return this._userComponents$;
	}

	public loadUserProjects(): Observable<UserProject[]> {
		if (!this.auth.isLoggedIn)
			return of([]);

		this._userProjects$ = this.http.get<HttpResponseData<UserComponent[]>>('/api/project/get-all-projects-info').pipe(
			map(data => data.result),
			shareReplay(),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not get Projects from Server: (${x.status}) ${x.error.error.description}`,
				[])
		);
		return this._userProjects$;
	}

	public changeProfilePicture(file: File): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		const formData = new FormData();
		formData.append('picture', file);
		return this.http.post<HttpResponseData<any>>('/api/user/upload-picture', formData).pipe(
			map(data => data.result.success),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Picture upload failed: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public updateProfile(profile: {username?: string, email?: string, password?: string}): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>('/api/user/update', profile).pipe(
			map(data => {
				this.auth.updateUserInfo();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not update profile: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public updateProject(changes: {name?: string, description?: string}) {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>('/api/project/update', changes).pipe(
			map(data => {
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not update project: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}
}
