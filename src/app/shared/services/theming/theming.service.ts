import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {DOCUMENT, isPlatformServer} from '@angular/common';
import {Observable, Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ThemingService {

	private _currentTheme: 'light' | 'dark';

	private _themeSubject$ = new Subject<'light' | 'dark'>();

	constructor(@Inject(DOCUMENT) private document: HTMLDocument, @Inject(PLATFORM_ID) private platformId: string) {
		if (isPlatformServer(this.platformId)) {
			this._currentTheme = 'dark';
			this._themeSubject$.next('dark');
		}
	}

	public init() {
		this.loadTheme();
		this.setThemeClass(this.currentTheme);
	}

	private setThemeClass(theme: 'light' | 'dark') {
		if (theme === 'dark') {
			this.document.body.classList.remove(`theme-light`);
			this.document.body.classList.add(`theme-dark`);
		} else {
			this.document.body.classList.add(`theme-light`);
			this.document.body.classList.remove(`theme-dark`);
		}
	}

	public setTheme(theme: 'light' | 'dark') {
		localStorage.setItem('theme', theme);
		this._currentTheme = theme;
		this._themeSubject$.next(theme);
		this.setThemeClass(this.currentTheme);
	}

	public toggleTheme() {
		if (this.currentTheme === 'dark') {
			this.setTheme('light');
		} else {
			this.setTheme('dark');
		}
	}

	public get currentTheme(): 'light' | 'dark' {
		return this._currentTheme;
	}

	private loadTheme() {
		this._currentTheme = (localStorage.getItem('theme') || 'dark') as any;
		this._themeSubject$.next(this.currentTheme);
	}

	public get currentTheme$(): Observable<'light' | 'dark'> {
		return this._themeSubject$.asObservable();
	}
}
