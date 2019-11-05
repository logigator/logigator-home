import {InjectionToken} from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');

export function windowFactory(): Window | null {
	if (typeof window !== 'undefined' && window.document) return window;
	return undefined;
}
