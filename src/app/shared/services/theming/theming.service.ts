import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ThemingService {

	private _currentTheme: 'light' | 'dark';

	constructor(@Inject(DOCUMENT) private document: HTMLDocument) {
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
	}
}
