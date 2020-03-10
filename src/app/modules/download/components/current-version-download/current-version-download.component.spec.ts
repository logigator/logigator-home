import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVersionDownloadComponent } from './current-version-download.component';

describe('CurrentVersionDownloadComponent', () => {
	let component: CurrentVersionDownloadComponent;
	let fixture: ComponentFixture<CurrentVersionDownloadComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CurrentVersionDownloadComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CurrentVersionDownloadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
