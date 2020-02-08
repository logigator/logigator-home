import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlingService} from '../error-handling/error-handling.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {HttpResponseData} from '../../models/http-responses/http-response-data';
import {UserInfo} from '../../models/http-responses/user-info';
import {UserComponent} from '../../models/http-responses/user-component';
import {AuthService} from '../auth/auth.service';
import {UserProject} from '../../models/http-responses/user-project';
import {environment} from '../../../../environments/environment';
import {ElectronDownloadData} from '../../models/http-responses/electron-download-data';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private _userProjects$: Observable<UserProject[]>;
	private _userProjectsSubject$ = new BehaviorSubject<void>(undefined);

	private _userComponents$: Observable<UserComponent[]>;
	private _userComponentsSubject$ = new BehaviorSubject<void>(undefined);

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

		this._userComponents$ = this._userComponentsSubject$.pipe(
			switchMapTo(
				this.http.get<HttpResponseData<UserComponent[]>>(environment.apiPrefix + '/project/get-all-components-info').pipe(
					map(data => data.result),
					this.errorHandling.catchErrorOperatorDynamicMessage(
						(x) => `Could not get Components from Server: (${x.status}) ${x.error.error.description}`,
						[])
				)
			),
			shareReplay(1)
		);
		return this._userComponents$;
	}

	public loadUserProjects(): Observable<UserProject[]> {
		if (!this.auth.isLoggedIn)
			return of([]);

		this._userProjects$ = this._userProjectsSubject$.pipe(
			switchMapTo(
				this.http.get<HttpResponseData<UserComponent[]>>(environment.apiPrefix + '/project/get-all-projects-info').pipe(
					map(data => data.result),
					this.errorHandling.catchErrorOperatorDynamicMessage(
						(x) => `Could not get Projects from Server: (${x.status}) ${x.error.error.description}`,
						[])
				)
			),
			shareReplay(1)
		);
		return this._userProjects$;
	}

	public changeProfilePicture(blob: Blob): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		const formData = new FormData();
		formData.append('picture', blob);
		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + '/user/upload-picture', formData).pipe(
			map(data => data.result.success)
		);
	}

	public updateProfile(profile: {username?: string, email?: string, password?: string}): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + '/user/update', profile).pipe(
			map(data => {
				this.auth.updateUserInfo();
				return data.result.success;
			})
		);
	}

	public updateProject(id: number, changes: {name?: string, description?: string}): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + `/project/update/${id}`, changes).pipe(
			map(data => {
				this._userProjectsSubject$.next();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not update project: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public updateComponent(id: number, changes: {name?: string, description?: string, symbol?: string}): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + `/project/update/${id}`, changes).pipe(
			map(data => {
				this._userComponentsSubject$.next();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not update project: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public deleteProject(id: number): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.get<HttpResponseData<any>>(environment.apiPrefix + `/project/delete/${id}`).pipe(
			map(data => {
				this._userProjectsSubject$.next();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not delete project: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	// TODO: Check if component is in use
	public deleteComponent(id: number): Observable<boolean> {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.get<HttpResponseData<any>>(environment.apiPrefix + `/project/delete/${id}`).pipe(
			map(data => {
				this._userComponentsSubject$.next();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not delete component: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public newProject(name: string) {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + `/project/create`, {
			name,
			isComponent: false,
		}).pipe(
			map(data => {
				this._userProjectsSubject$.next();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not create project: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public newComponent(name: string, symbol: string) {
		if (!this.auth.isLoggedIn)
			return of(false);

		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + `/project/create`, {
			name,
			isComponent: true,
			symbol
		}).pipe(
			map(data => {
				this._userComponentsSubject$.next();
				return data.result.success;
			}),
			this.errorHandling.catchErrorOperatorDynamicMessage(
				(x) => `Could not create component: (${x.status}) ${x.error.error.description}`,
				false)
		);
	}

	public getElectronDownloadData(): Observable<ElectronDownloadData> {
		return this.http.get<ElectronDownloadData>('https://raw.githubusercontent.com/logigator/logigator-editor/development/currrent-electron-version.json');
	}
}
