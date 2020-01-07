import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, share, shareReplay, switchMap, switchMapTo} from 'rxjs/operators';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {HttpResponseData} from '../../models/http-responses/http-response-data';
import {UserInfo} from '../../models/http-responses/user-info';
import {ErrorHandlingService} from '../error-handling/error-handling.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {WINDOW} from '../../injectable-window';
import {SharedCompsAuthService} from '@logigator/logigator-shared-comps';

@Injectable({
	providedIn: 'root'
})
export class AuthService implements SharedCompsAuthService {

	private _userInfo$: Observable<UserInfo>;
	private _userSubject$ = new BehaviorSubject<void>(undefined);

	constructor(
		private http: HttpClient,
		@Inject(DOCUMENT) private document: Document,
		@Inject(WINDOW) private window: Window,
		@Inject(PLATFORM_ID) private platformId: string,
		private errorHandling: ErrorHandlingService,
		private router: Router
	) { }

	public get userInfo$(): Observable<UserInfo> {
		if (!this._userInfo$)
			this.getUserInformation();
		return this._userInfo$;
	}

	public async authenticateTwitter(): Promise<any> {
		if (!this.window) return;
		const authUrlResponse: any = await this.http.get(environment.apiPrefix + '/auth/twitter-auth-url').toPromise();
		const popup = this.openPopUp(authUrlResponse.result.url);
		const oauthData = await this.pollingAuthPopup(popup, 'twitter');
		return await this.http.post(environment.apiPrefix + '/auth/verify-twitter-credentials', oauthData).toPromise();
	}

	public async authenticateGoogle(): Promise<any> {
		if (!this.window) return;
		const authUrlResponse: any = await this.http.get(environment.apiPrefix + '/auth/google-auth-url').toPromise();
		const popup = this.openPopUp(authUrlResponse.result.url);
		const oauthData = await this.pollingAuthPopup(popup, 'google');
		return await this.http.post(environment.apiPrefix + '/auth/verify-google-credentials', oauthData).toPromise();
	}

	public registerEmail(username: string, email: string, password: string, recaptcha: string): Promise<any> {
		return this.http.post(environment.apiPrefix + '/auth/register-email', {username, email, password, recaptcha}).toPromise();
	}

	public loginEmail(user: string, password: string): Promise<any> {
		return this.http.post(environment.apiPrefix + '/auth/login-email', {user, password}).toPromise();
	}

	async resendVerificationMail(user: string, password: string): Promise<any> {
		return this.http.post(environment.apiPrefix + '/auth/resend-verification-mail', {user, password}).toPromise();
	}

	public async logout(): Promise<any> {
		if (!this.isLoggedIn) {
			throw Error('not logged in');
		}
		await this.http.get(environment.apiPrefix + '/auth/logout').toPromise();
		await this.router.navigate(['/']);
	}

	public get isLoggedIn(): boolean {
		if (!isPlatformBrowser(this.platformId)) return false;
		const isLoggedIn = this.document.cookie.match('(^|[^;]+)\\s*' + 'isLoggedIn' + '\\s*=\\s*([^;]+)');
		if (!isLoggedIn) {
			return false;
		}
		return isLoggedIn[0] !== '' && isLoggedIn[0].endsWith('true');
	}

	public verifyEmail(token: string) {
		return this.http.get(environment.apiPrefix + '/auth/verify-email/' + token).toPromise();
	}

	private openPopUp(url: string): Window {
		return this.window.open(url, '_blank');
	}

	private pollingAuthPopup(popup: Window, type: 'twitter' | 'google'):
		Promise<{oauth_verifier: string, oauth_token: string} | {code: string}> {
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
								const oauthToken = query.get('oauth_token');
								const oauthVerifier = query.get('oauth_verifier');
								close(polling);
								resolve({oauth_verifier: oauthVerifier, oauth_token: oauthToken});
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

					return this.http.get<HttpResponseData<UserInfo>>(environment.apiPrefix + '/user/get').pipe(
						map(response => response.result),
						map(data => {
							data.user.profile_image = environment.apiPrefix + '/images/profile/' + data.user.profile_image;
							return data;
						}),
						this.errorHandling.catchErrorOperator('Unable to get user info.', undefined)
					);
				})
			)),
			shareReplay(1)
		);
	}
}
