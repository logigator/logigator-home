import {
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	ViewChild
} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {ApiService} from '../../../../shared/services/api/api.service';
import {IImage, } from 'ng-simple-slideshow';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../../../../../environments/environment';
import {ThemingService} from '../../../../shared/services/theming/theming.service';

@Component({
	selector: 'app-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit, OnDestroy {

	private _destroySubject = new Subject();

	@ViewChild('slideshow', {static: true, read: ElementRef})
	private _slideshow: ElementRef<HTMLDivElement>;

	@ViewChild('slideshow', {static: true})
	private _slideshowComp: any;

	public autoPlay = true;
	public imageUrls: IImage[];

	constructor(private api: ApiService, @Inject(PLATFORM_ID) private platformId: string, private themingService: ThemingService) {}

	ngOnInit() {
		fromEvent(this._slideshow.nativeElement, 'mouseenter').pipe(
			takeUntil(this._destroySubject)
		).subscribe((e: MouseEvent) => this.autoPlay = false);

		fromEvent(this._slideshow.nativeElement, 'mouseleave').pipe(
			takeUntil(this._destroySubject)
		).subscribe((e: MouseEvent) => this.autoPlay = true);

		this.imageUrls = this.getImageUrls(this.currentTheme);

		this.themingService.currentTheme$.pipe(
			takeUntil(this._destroySubject),
			distinctUntilChanged()
		).subscribe(theme => {
			this.imageUrls = this.getImageUrls(theme);
		});
	}

	private openExample(example: string) {
		if (isPlatformBrowser(this.platformId)) {
			window.open(environment.editor + '/share/' + example, '_blank');
		}
	}

	private getImageUrls(theme: string): IImage[] {
		return 	[
			{
				url: `/assets/example-circuits/${theme}/basic-gates.png`,
				title: 'Basic Gates Example',
				caption: 'Basic Gates',
				clickAction: () => this.openExample('399260d2-70ea-4d96-849c-96905a9d3e3d')
			},
			{
				url: `/assets/example-circuits/${theme}/half-adder.png`,
				title: 'Half Adder Example',
				caption: 'Half Adder',
				clickAction: () => this.openExample('0dabb6bf-442d-467f-8f73-cd83957afc3f')
			},
			{
				url: `/assets/example-circuits/${theme}/full-adder.png`,
				title: 'Full Adder Example',
				caption: 'Full Adder',
				clickAction: () => this.openExample('e1949e6c-b65d-4020-8d9e-f4f90780f052')
			},
			{
				url: `/assets/example-circuits/${theme}/flip-flops.png`,
				title: 'Flip Flops Example',
				caption: 'Flip Flops',
				clickAction: () => this.openExample('e7185d88-75bd-4590-b525-c498b1c30b53')
			},
			{
				url: `/assets/example-circuits/${theme}/4-bit-counter.png`,
				title: '4 Bit Counter Example',
				caption: '4 Bit Counter',
				clickAction: () => this.openExample('d178024f-113e-496f-a9a0-750740a82ae7')
			},
			{
				url: `/assets/example-circuits/${theme}/4-bit-adder.png`,
				title: '4 Bit Adder Example',
				caption: '4 Bit Adder',
				clickAction: () => this.openExample('bc6d296a-8251-4016-a4c0-555464ed1358')
			}
		];
	}

	public tryNowClick() {
		this.getImageUrls(this.themingService.currentTheme)[this._slideshowComp.slideIndex].clickAction();
	}

	public get currentTheme(): string {
		return this.themingService.currentTheme;
	}

	ngOnDestroy(): void {
		this._destroySubject.next();
		this._destroySubject.unsubscribe();
	}
}
