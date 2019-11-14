import {Directive, ElementRef, Inject, Input, OnInit} from '@angular/core';
import {WINDOW} from '../../injectable-window';

@Directive({
	selector: 'img[appLazyLoad],iframe[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {

	@Input()
	dataSrc: string;

	private _intersectionObserver: IntersectionObserver;

	constructor(
		private el: ElementRef<HTMLIFrameElement | HTMLImageElement>,
		@Inject(WINDOW) private window: Window
	) { }

	ngOnInit(): void {
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
