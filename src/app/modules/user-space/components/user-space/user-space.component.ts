import {Component, Inject, inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {WINDOW} from '../../../../shared/injectable-window';

@Component({
	selector: 'app-user-space',
	templateUrl: './user-space.component.html',
	styleUrls: ['./user-space.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class UserSpaceComponent {

	constructor(
		@Inject(WINDOW) private window: Window,
		@Inject(PLATFORM_ID) private platformId: string
	) { }

	public onActivate(event) {
		if (isPlatformBrowser(this.platformId))
			this.window.scroll(0, 0);
	}
}
