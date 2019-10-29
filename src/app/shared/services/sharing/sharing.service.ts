import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlingService} from '../error-handling/error-handling.service';
import {HttpResponseData} from '../../models/http-responses/http-response-data';
import {Observable} from 'rxjs';
import {CreateShare, UpdateShare} from '../../models/http-requests/share-settings';
import {CreateShareResp} from '../../models/http-responses/create-share-resp';
import {ShareInfo} from '../../models/http-responses/share-info';
import {OpenShareResp} from '../../models/http-responses/open-share-resp';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SharingService {

	constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

	public async createShare(settings: CreateShare): Promise<HttpResponseData<CreateShareResp>> {
		return this.http.post<HttpResponseData<CreateShareResp>>(environment.apiPrefix + '/share/create', settings).pipe(
			this.errorHandler.catchErrorOperator('Unable to create share.', undefined)
		).toPromise();
	}

	public updateShare(settings: UpdateShare, address: string): Promise<HttpResponseData<any>> {
		return this.http.post<HttpResponseData<any>>(environment.apiPrefix + `/share/update/${address}`, settings).pipe(
			this.errorHandler.catchErrorOperator('Unable to update share.', undefined)
		).toPromise();
	}

	public deleteShare(address: string): Promise<HttpResponseData<any>> {
		return this.http.get<HttpResponseData<any>>(environment.apiPrefix + `/share/delete/${address}`).pipe(
			this.errorHandler.catchErrorOperator('Unable to delete share.', undefined)
		).toPromise();
	}

	public getShareSettings(projectId: number): Promise<ShareInfo> {
		return this.http.get<HttpResponseData<ShareInfo[]>>(environment.apiPrefix + '/share/get').pipe(
			map(resp => {
				const share =  resp.result.find(s => s.project_id === projectId);
				if (share) {
					share.is_public = share.is_public !== 0;
					share.users = share.users.filter(u => u.email);
				}
				return share;
			}),
			this.errorHandler.catchErrorOperator('Unable to get share information.', undefined)
		).toPromise();
	}

	public openShare(address: string): Observable<OpenShareResp> {
		return this.http.get<HttpResponseData<OpenShareResp>>(environment.apiPrefix + '/share/get/' + address).pipe(
			map(r => r.result)
		);
	}
}
