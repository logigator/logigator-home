import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {map, share, shareReplay, switchMap, switchMapTo} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {HttpResponseData} from '../../models/http-responses/http-response-data';
import {UserInfo} from '../../models/http-responses/user-info';
import {ErrorHandlingService} from '../error-handling/error-handling.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _userInfo$: Observable<UserInfo>;
	private _userSubject$ = new BehaviorSubject<void>(undefined);

	constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private errorHandling: ErrorHandlingService) { }

	public get userInfo$(): Observable<UserInfo> {
		if (!this._userInfo$)
			this.getUserInformation();
		return this._userInfo$;
	}

	public async authenticateTwitter(): Promise<any> {
		const authUtlResponse: any = await this.http.get('/api/auth/twitter-auth-url').toPromise();
		const popup = this.openPopUp();
		popup.location.href = authUtlResponse.result.url;
		const oauthData = await this.pollingAuthPopup(popup, 'twitter');
		return await this.http.post('/api/auth/verify-twitter-credentials', oauthData).toPromise();
	}

	public async authenticateGoogle(): Promise<any> {
		const authUrlResponse: any = await this.http.get('/api/auth/google-auth-url').toPromise();
		const popup = this.openPopUp();
		popup.location.href = authUrlResponse.result.url;
		const oauthData = await this.pollingAuthPopup(popup, 'google');
		return await this.http.post('/api/auth/verify-google-credentials', oauthData).toPromise();
	}

	public async registerEmail(email: string, password: string) {
		return this.http.post('/api/auth/register-email', {email, password}).toPromise();
	}

	public async loginEmail(email: string, password: string) {
		return this.http.post('/api/auth/login-email', {email, password}).toPromise();
	}

	public async logout() {
		if (!this.isLoggedIn) {
			throw Error('not logged in');
		}
		await this.http.get('/api/auth/logout').toPromise();
	}

	public get isLoggedIn(): boolean {
		const isLoggedIn = this.document.cookie.match('(^|[^;]+)\\s*' + 'isLoggedIn' + '\\s*=\\s*([^;]+)');
		if (!isLoggedIn) {
			return false;
		}
		return isLoggedIn[0] !== '' && isLoggedIn[0].endsWith('true');
	}

	private openPopUp(): Window {
		const w = 450;
		const h = 620;
		const left = screen.width / 2 - w / 2;
		const top = screen.height / 2 - h / 2;

		return window.open(
			'',
			'',
			'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
			w +
			', height=' +
			h +
			', top=' +
			top +
			', left=' +
			left
		);
	}

	private pollingAuthPopup(popup: Window, type: 'twitter' | 'google'): Promise<{oauth_verifier: string, oauth_token: string} | {code: string}> {
		const close = (polling) => {
			popup.close();
			clearInterval(polling);
		};

		return new Promise<{oauth_verifier: string, oauth_token: string} | {code: string}>((resolve, reject) => {
			const polling = setInterval(() => {

				if (!popup || popup.closed || popup.closed === undefined) {
					clearInterval(polling);
					reject('Popup closed by user');
				}

				try {
					if (!popup.location.hostname.includes('api.twitter.com')
						&& !popup.location.hostname.includes('accounts.google.com')
						&& popup.location.hostname !== '') {

						if (popup.location.search) {
							const query = new URLSearchParams(popup.location.search);

							if (type === 'twitter') {
								const oauth_token = query.get('oauth_token');
								const oauth_verifier = query.get('oauth_verifier');
								close(polling);
								resolve({oauth_verifier, oauth_token});
							} else if (type === 'google') {
								const code = query.get('code');
								close(polling);
								resolve({code});
							}
						} else {
							close(polling);
							reject('OAuth redirect has occurred but no query or hash parameters were found.');
						}
					}
				} catch (e) {}

			}, 500);
		});
	}

	public updateUserInfo() {
		if (this._userInfo$)
			this._userSubject$.next();
	}

	private getUserInformation() {
		this._userInfo$ = this._userSubject$.pipe(
			switchMapTo(of(this.isLoggedIn).pipe(
				switchMap(isLoggedIn => {
					if (!isLoggedIn) return of(undefined);

					return this.http.get<HttpResponseData<UserInfo>>('/api/user/get').pipe(
						map(response => response.result),
						this.errorHandling.catchErrorOperator('Unable to get user info.', undefined)
					);
				})
			)),
			shareReplay(1)
		);
	}
}
