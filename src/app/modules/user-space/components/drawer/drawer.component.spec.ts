import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
	let component: DrawerComponent;
	let fixture: ComponentFixture<DrawerComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ DrawerComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DrawerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
