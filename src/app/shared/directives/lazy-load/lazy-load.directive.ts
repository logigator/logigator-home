import {Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {WINDOW} from '../../injectable-window';
import {isPlatformServer} from '@angular/common';

@Directive({
	selector: 'img[appLazyLoad],iframe[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {

	@Input()
	dataSrc: string;

	private _intersectionObserver: IntersectionObserver;

	constructor(
		private el: ElementRef<HTMLIFrameElement | HTMLImageElement>,
		@Inject(WINDOW) private window: Window,
		@Inject(PLATFORM_ID) private platformId: string
	) { }

	ngOnInit(): void {
		if (isPlatformServer(this.platformId)) return;
		if ('IntersectionObserver' in window) {
			this._intersectionObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const lazy = entry.target;
						lazy.setAttribute('src', this.dataSrc);
						this._intersectionObserver.unobserve(lazy);
					}
				});
			});
			this._intersectionObserver.observe(this.el.nativeElement);
		} else {
			this.el.nativeElement.setAttribute('src', this.dataSrc);
		}
	}

}
