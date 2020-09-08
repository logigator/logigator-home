import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { UserSpaceComponent } from './user-space.component';

describe('UserSpaceComponent', () => {
	let component: UserSpaceComponent;
	let fixture: ComponentFixture<UserSpaceComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ UserSpaceComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserSpaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
