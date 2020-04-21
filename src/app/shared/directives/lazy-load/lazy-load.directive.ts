import {Directive, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {WINDOW} from '../../injectable-window';
import {DOCUMENT, isPlatformServer} from '@angular/common';

@Directive({
	selector: 'img[appLazyLoad],iframe[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit, OnChanges {

	@Input()
	dataSrc: string;

	private _intersectionObserver: IntersectionObserver;

	private hasIntersected = false;

	constructor(
		private el: ElementRef<HTMLIFrameElement | HTMLImageElement>,
		@Inject(WINDOW) private window: Window,
		@Inject(DOCUMENT) private document: Document,
		@Inject(PLATFORM_ID) private platformId: string
	) { }

	ngOnInit(): void {
		if (isPlatformServer(this.platformId)) return;
		if ('IntersectionObserver' in window) {
			this._intersectionObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					const lazy = entry.target;
					if (entry.isIntersecting) {
						if (this.document.readyState === 'complete') {
							if (this.isImageUrl(this.dataSrc)) {
								lazy.setAttribute('src', this.dataSrc);
							}
							this.hasIntersected = true;
						} else {
							this.window.addEventListener('load', () => {
								if (this.isImageUrl(this.dataSrc)) {
									lazy.setAttribute('src', this.dataSrc);
								}
								this.hasIntersected = true;
							});
						}
						this._intersectionObserver.unobserve(lazy);
					}
				});
			});
			this._intersectionObserver.observe(this.el.nativeElement);
		} else {
			this.el.nativeElement.setAttribute('src', this.dataSrc);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (isPlatformServer(this.platformId) || !this.hasIntersected) return;
		if (this.isImageUrl(this.dataSrc))
			this.el.nativeElement.setAttribute('src', this.dataSrc);
	}

	private isImageUrl(image: string): boolean {
		return image.startsWith('/assets') || image.startsWith('http://')  || image.startsWith('https://');
	}

}
