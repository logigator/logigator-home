import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {UserProject} from '../../../../shared/models/http-responses/user-project';
import {ApiService} from '../../../../shared/services/api/api.service';
import {IImage} from 'ng-simple-slideshow';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'app-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit, OnDestroy {

	private _destroySubject = new Subject();

	@ViewChild('slideshow', {static: true, read: ElementRef})
	private _slideshow: ElementRef<HTMLDivElement>;

	public autoPlay = true;
	public imageUrls: IImage[] = [
		{
			url: ''
		},
		{
			url: ''
		}
	];

	constructor(private api: ApiService) {
	}

	ngOnInit() {
		fromEvent(this._slideshow.nativeElement, 'mouseenter').pipe(
			takeUntil(this._destroySubject)
		).subscribe((e: MouseEvent) => this.autoPlay = false);

		fromEvent(this._slideshow.nativeElement, 'mouseleave').pipe(
			takeUntil(this._destroySubject)
		).subscribe((e: MouseEvent) => this.autoPlay = true);
	}

	ngOnDestroy(): void {
		this._destroySubject.next();
		this._destroySubject.unsubscribe();
	}
}
