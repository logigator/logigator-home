import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { CurrentVersionDownloadComponent } from './current-version-download.component';

describe('CurrentVersionDownloadComponent', () => {
	let component: CurrentVersionDownloadComponent;
	let fixture: ComponentFixture<CurrentVersionDownloadComponent>;

	beforeEach(waitForAsync(() => {
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
